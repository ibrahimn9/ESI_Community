const jwt = require("jsonwebtoken");
const validator = require("../utils/validator");
const config = require("../utils/config");

const postRouter = require("express").Router();


const googleDrive = require("../utils/googleDrive");
const multerService = require("../utils/multerService");
const { google } = require("googleapis");

const Post = require("../models/post");
const User = require("../models/user");

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
  const { title, description } = req.body
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
      user: user._id.toString(),
      url: fileUrl,
    });
    const savedPost = await post.save();
    user.posts = user.posts.concat(savedPost._id.toString());
    const savedUser = await user.save();
    return res.status(201).send(savedPost);
  } catch (error) {
    console.log(error);
    return res.status(500).send("Server Error");
  }
});

postRouter.put("/:id", async (req, res) => {
  const body = req.body;
  const post = {
    title: body.title,
    description: body.description,
    likes: body.likes,
    user: body.user, 
  };
  const updatedPost = await Post.findByIdAndUpdate(req.params.id, post, {
    new: true,
  });
  return res.json(updatedPost);
});

module.exports = postRouter;
