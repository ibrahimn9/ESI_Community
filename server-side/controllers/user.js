const bcrypt = require("bcrypt");
const validator = require("../utils/validator");
const jwt = require("jsonwebtoken");

const userRouter = require("express").Router();

const User = require("../models/user");

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
  Person.findByIdAndRemove(req.params.id)
    .then((result) => {
      res.status(204).end();
    })
    .catch((error) => next(error));
});

userRouter.post("/", async (req, res) => {
  const body = req.body;

  if (!body.name || !body.password || !body.email || !body.class) {
    return res.status(400).json({ error: "name or email or pwd missing" });
  }
  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(body.password, saltRounds);

  const user = new User({
    name: body.name,
    email: body.email,
    passwordHash,
    class: body.class,
    pic: body.pic,
  });

  const savedUser = await user.save();
  res.json(savedUser);
});

userRouter.put("/:id", (req, res, next) => {
  const body = req.body;

  const user = {
    name: body.name,
    email: body.email,
    pwd: body.pwd,
    niv: body.niv,
  };

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


module.exports = userRouter;