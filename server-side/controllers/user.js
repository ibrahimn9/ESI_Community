const userRouter = require("express").Router();
const bcrypt = require("bcrypt");
const validator = require("../utils/validator");
const jwt = require("jsonwebtoken");
const config = require("../utils/config");

const googleDrive = require("../utils/googleDrive");
const multerService = require("../utils/multerService");
const { google } = require("googleapis");



const User = require("../models/user");
const Post = require("../models/post");

userRouter.get("/", async (req, res) => {
  const users = await User.find({});
  return res.json(users.map((user) => user.toJSON()));
});

userRouter.get("/:id", (req, res, next) => {
  User.findById(req.params.id)
    .then((returnedUser) => {
      if (returnedUser) {
        res.json(returnedUser);
      } else {
        res.status(404).end();
      }
    })
    .catch((error) => next(error));
});

userRouter.delete("/:id", (req, res, next) => {

  const token = req.header("Authorization").split(" ")[1];

  const decodedToken = jwt.verify(token, config.SECRET);
  if (!decodedToken) {
    return res.status(400);
  }

  Person.findByIdAndRemove(decodedToken.id)
    .then((result) => {
      res.status(204).end();
    })
    .catch((error) => next(error));
});

userRouter.post("/", multerService.upload.single("file"), async (req, res) => {
  const body = req.body;
  const file = req.file;

  if (!body.name || !body.password || !body.email || !body.class) {
    return res.status(400).json({ error: "name or email or pwd missing" });
  }
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
  const pic = fileUrl.match(/\/d\/(.+?)\/view/)[1];

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(body.password, saltRounds);

  const user = new User({
    name: body.name,
    email: body.email,
    passwordHash,
    class: body.class,
    pic,
  });

  const savedUser = await user.save();
  res.json(savedUser);
});

userRouter.post(
  "/update_profile",
  multerService.upload.single("file"),
  async (req, res) => {
    const body = req.body;
    const file = req.file;
    const token = req.header("Authorization").split(" ")[1];

    const decodedToken = jwt.verify(token, config.SECRET);
    if (!decodedToken) {
      return res.status(400);
    }

    const user = await User.findById(decodedToken.id);

    let pic;

    if (file) {
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
      pic = fileUrl.match(/\/d\/(.+?)\/view/)[1];
    }

    user.name = body.name || user.name;
    user.pic = pic || user.pic;
    user.brandColor = body.brandColor || user.brandColor;
    user.bio = body.bio || user.bio;

    const savedUser = await user.save();
    res.json(savedUser);
  }
);

userRouter.post("/update_password", async (req, res) => {
  const body = req.body;
  const token = req.header("Authorization").split(" ")[1];

  const decodedToken = jwt.verify(token, config.SECRET);
  if (!decodedToken) {
    return res.status(400);
  }
  const user = await User.findById(decodedToken.id);

  const passwordCorrect = await bcrypt.compare(body.currPassword, user.passwordHash);

  if (! passwordCorrect ) {
    return res.json({
      error: "invalid password",
    });
  }

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(body.password, saltRounds);

  user.passwordHash = passwordHash 

  const savedUser = await user.save();
  res.json(savedUser);
});

userRouter.post("/change_password", async (req, res) => {
  const body = req.body;
  console.log(body)

  const user = await User.findOne({ email: body.email});

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(body.password, saltRounds);

  user.passwordHash = passwordHash 

  const savedUser = await user.save();
  return res.json(savedUser);
});

userRouter.put("/:id", (req, res, next) => {
  const user = req.body;

  User.findByIdAndUpdate(req.params.id, user, {
    new: true,
    runValidators: true,
    context: "qurey",
  })
    .then((updatedUser) => {
      res.json(updatedUser);
    })
    .catch((error) => next(error));
});

userRouter.post("/verify-email", async (req, res) => {
  const { email } = req.query;
  const { valid, exist } = await validator.verifyEmail(email);
  return res.json({
    valid,
    exist,
  });
});

userRouter.post("/verify-password", (req, res) => {
  const { password } = req.body;
  const arrayOfErrors = validator.verifyPassword(password);
  const isValid = arrayOfErrors.length === 0;
  return res.json({
    valid: isValid,
    errors: arrayOfErrors,
  });
});

userRouter.post("/verify-username", async (req, res) => {
  const { username } = req.query;
  const arrayOfErrors = await validator.verifyUsername(username);
  const isValid = arrayOfErrors.length === 0;
  return res.json({
    valid: isValid,
    errors: arrayOfErrors,
  });
});

let confirmationCode;
userRouter.post("/confirm_email", async (req, res) => {
  const { email } = req.body;
  confirmationCode = await validator.confirmCode(email);
  return res.status(200);
});

userRouter.post("/confirm_code", async (req, res) => {
  const { code } = req.body;
  const codeNumber = parseInt(code);
  const isValid = confirmationCode === codeNumber;
  return res.json({
    valid: isValid,
  });
});

userRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  const passwordCorrect =
    user === null ? false : await bcrypt.compare(password, user.passwordHash);

  if (!(user && passwordCorrect)) {
    return res.json({
      error: "invalid email or password",
    });
  }

  const userForToken = {
    email: user.email,
    id: user._id,
  };

  token = jwt.sign(userForToken, process.env.SECRET);
  res.status(200).json({ token, email: user.email, id: user._id });
});

userRouter.post("/verify-token", (req, res) => {
  const token = req.header("Authorization").split(" ")[1];
  try {
    const decodedToken = jwt.verify(token, process.env.SECRET);
    return res.json(decodedToken);
  } catch (err) {
    return res.json({ error: "token missing or invalid" });
  }
});

userRouter.put("/follow/:userId", async (req, res) => {
  const token = req.header("Authorization").split(" ")[1];
  const decodedToken = jwt.verify(token, config.SECRET);
  const { userId } = req.params;
  if (!decodedToken) {
    return res.status(400);
  }

  const user = await User.findById(decodedToken.id);
  const userToFollow = await User.findById(userId);
  if (!(user && userToFollow)) {
    return res.status(404);
  }

  user.folowing = user.folowing.concat(userId);
  userToFollow.folowers = userToFollow.folowers.concat(decodedToken.id);

  await user.save();
  await userToFollow.save();

  return res.status(200).json({ message: "Followed user successfully" });
});

userRouter.put("/unfollow/:userId", async (req, res) => {
  const { userId } = req.params;
  const token = req.header("Authorization").split(" ")[1];
  const decodedToken = jwt.verify(token, config.SECRET);

  if (!decodedToken) {
    return res.status(400);
  }

  try {
    const user = await User.findById(userId);
    const unfollower = await User.findById(decodedToken.id);
    user.folowers = user.folowers.filter(
      (followerId) => followerId !== decodedToken.id
    );

    unfollower.folowing = unfollower.folowing.filter(
      (followingId) => followingId !== userId
    );

    await user.save();
    await unfollower.save();

    res.status(200).json({ message: "Unfollowed user successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

userRouter.put("/mark/:postId", async (req, res) => {
  const token = req.header("Authorization").split(" ")[1];
  const decodedToken = jwt.verify(token, config.SECRET);

  const { postId } = req.params;

  if (!decodedToken) {
    return res.status(400);
  }

  try {
    const user = await User.findById(decodedToken.id);
    user.bookmarks = user.bookmarks.concat(postId);
    await user.save();
    res.status(200).json({ message: "marked post successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

userRouter.put("/unmark/:postId", async (req, res) => {
  const token = req.header("Authorization").split(" ")[1];
  const decodedToken = jwt.verify(token, config.SECRET);

  const { postId } = req.params;

  if (!decodedToken) {
    return res.status(400);
  }

  try {
    const user = await User.findById(decodedToken.id);
    user.bookmarks = user.bookmarks.filter((post) => post !== postId);
    await user.save();
    res.status(200).json({ message: "marked post successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

userRouter.post("/send-message", (req, res) => {
  const { message, emails } = req.body;
  validator.sendMessage(message, emails);
  res.status(200).json({ message: "message sent successfully" });
});

userRouter.post('/deletenotifications', async(req, res) => {
  const token = req.header("Authorization").split(" ")[1];
  const decodedToken = jwt.verify(token, config.SECRET);


  if (!decodedToken) {
    return res.status(400);
  }

  const user = await User.findById(decodedToken.id);

  user.notifications = []
  const savdedUser = await user.save();
  return res.json({ message: "deleted successfully" });
})

userRouter.put('/add_notification/:id', async(req, res) => {
  const token = req.header("Authorization").split(" ")[1];
  const { id } = req.params 
  const notification = req.body;
  const decodedToken = jwt.verify(token, config.SECRET);


  if (!decodedToken) {
    return res.status(400);
  }

  const user = await User.findById(id);

  user.notifications = user.notifications.concat(notification)
  const savedUser = await user.save();
  return res.json({ message: "added successfully" });
})




let tokenorg;
userRouter.post("/forgetedpassword", async (req, res) => {
  const { email } = req.body;
  tokenorg = await validator.forgetPassword(email)
  return res.json({ tokenorg });
});

userRouter.post('/forget_password', async (req, res) => {

  const { token } = req.body
  
  if (token !== tokenorg) {
    return res.json({refused: true});
  } else {
    tokenorg = null
    return res.json({refused: false});
  }
});

module.exports = userRouter;
