const jwt = require("jsonwebtoken");
const validator = require("../utils/validator");
const config = require("../utils/config");

const postRouter = require("express").Router();

const googleDrive = require("../utils/googleDrive");
const multerService = require("../utils/multerService");
const { google } = require("googleapis");



const Post = require("../models/post");
const User = require("../models/user");
const upload = require('../utils/upload_file_to_folder')

postRouter.get("/", async (req, res) => {
  const posts = await Post.find({});
  return res.json(posts.map((post) => post.toJSON()));
});

postRouter.get("/:id", (req, res, next) => {
  Post.findById(req.params.id)
    .then((returnedPost) => {
      if (returnedPost) {
        res.json(returnedPost);
      } else {
        res.status(404).end();
      }
    })
    .catch((error) => next(error));
});

postRouter.post("/", multerService.upload.single("file"), async (req, res) => {
  const file = req.file;
  const { title, description, year, speciality, semester, module, folder, fileSize } = req.body;
  const tags = JSON.parse(req.body.tags)
  const token = req.header("Authorization").split(" ")[1];

  try {
    if (!file) {
      return res.status(400).send("No file received.");
    }
    const decodedToken = jwt.verify(token, config.SECRET);
    if (!decodedToken) {
      return res.status(400);
    }

    const user = await User.findById(decodedToken.id);
    const auth = googleDrive.authenticateGoogle();
    const response = await googleDrive.uploadToGoogleDrive(file, auth);
    multerService.deleteFile(file.path);
    const fileId = response.id;
    const driveService = google.drive({ version: "v3", auth });
    const fileMetadata = await driveService.files.get({
      fileId: fileId,
      fields: "webViewLink",
    });

    const fileUrl = fileMetadata.data.webViewLink;
    const post = new Post({
      title,
      description,
      tags,
      user: user._id.toString(),
      url: fileUrl,
      path: {
        year,
        speciality,
        semester,
        module,
        folder,
      },
      fileSize,
    });

    const savedPost = await post.save();
    let postId = savedPost._id.toString()
    user.posts = user.posts.concat(postId)
    const savedUser = await user.save();
    return res.status(201).send(savedPost);
  } catch (error) {
    console.log(error);
    return res.status(500).send("Server Error");
  }
});

postRouter.put("/:id", async (req, res) => {
  const post = req.body;
  
  const updatedPost = await Post.findByIdAndUpdate(req.params.id, post, {
    new: true,
  });
  return res.json(updatedPost);
});

postRouter.put("/comment/:postId", async (req, res) => {
  const token = req.header("Authorization").split(" ")[1];
  const body = req.body;
  const decodedToken = jwt.verify(token, config.SECRET);
  const { postId } = req.params;
  if (!decodedToken) {
    return res.status(400);
  }

  const user = await User.findById(decodedToken.id);
  const post = await Post.findById(postId);
  if (!(user && post)) {
    return res.status(404);
  }

  const comment = {
    user: decodedToken.id,
    text: body.comment,
  };

  post.comments = post.comments.concat(comment);
  await post.save();
  return res.status(200).json(comment);
});

postRouter.put("/up/:postId", async (req, res) => {
  const token = req.header("Authorization").split(" ")[1];
  const decodedToken = jwt.verify(token, config.SECRET);

  const { postId } = req.params;

  if (!decodedToken) {
    return res.status(400);
  }
  const post = await Post.findById(postId);
  if (!post.up.includes(decodedToken.id)) {
    post.up = post.up.concat(decodedToken.id);
    if (post.down.includes(decodedToken.id)) {
      post.down = post.down.filter((user) => user !== decodedToken.id);
    }
    await post.save();
    res.status(200);
  }
});

postRouter.put("/down/:postId", async (req, res) => {
  const token = req.header("Authorization").split(" ")[1];
  const decodedToken = jwt.verify(token, config.SECRET);

  const { postId } = req.params;

  if (!decodedToken) {
    return res.status(400);
  }

  const post = await Post.findById(postId);

  if (!post.down.includes(decodedToken.id)) {
    post.down = post.down.concat(decodedToken.id);
    if (post.up.includes(decodedToken.id)) {
      post.up = post.up.filter((user) => user !== decodedToken.id);
    }
    await post.save();
    res.status(200);
  }
});










postRouter.post('/upload', async (req, res, next) => {
  const classInput = req.body.classInput;
  const fileUrl = req.body.fileUrl;
  const semestere = req.body.semestere;
  const type = req.body.type
  const module = req.body.module
  try {
    const auth = upload.authenticateGoogle();
    const folderId = await upload.find_folder_by_name(classInput, semestere, module, type, auth);
    upload.uploadFileToDrive(fileUrl, folderId, auth);
    res.send("roh")
  }
  catch (error) {
    res.send("matrohch")
  }
});


module.exports = postRouter;