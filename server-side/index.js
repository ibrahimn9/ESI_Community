const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const bcrypt = require("bcrypt");
const app = express();
const validator = require("./validator");
const mongoose = require("mongoose");
const bodyparser = require("body-parser").urlencoded({ extended: true });
const jwt = require("jsonwebtoken");

app.use(express.json());
app.use(cors());
app.use(bodyparser);
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "*");
  res.setHeader("Access-Control-Allow-Headers", "Authorization");
  next();
});

morgan.token("post", (req, res) => {
  if (req.method === "POST") return JSON.stringify(req.body);
  else return "";
});

morgan.format(
  "postFormat",
  ":method :url :status :res[content-length] - :response-time ms | :post"
);

app.use(morgan("postFormat"));

const User = require("./models/user");
const bodyParser = require("body-parser");


app.get("/api/user/:id", (req, res, next) => {
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

app.delete("/api/user/:id", (req, res, next) => {
  Person.findByIdAndRemove(req.params.id)
    .then((result) => {
      res.status(204).end();
    })
    .catch((error) => next(error));
});

app.post("/api/user", async (req, res) => {
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

app.put("/api/user/:id", (req, res, next) => {
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

app.post("/api/verify-email", async (req, res) => {
  const { email } = req.query;
  const { valid, exist } = await validator.verifyEmail(email);
  return res.json({
    valid,
    exist,
  });
});

app.post("/api/verify-password", (req, res) => {
  const { password } = req.body;
  const arrayOfErrors = validator.verifyPassword(password);
  const isValid = arrayOfErrors.length === 0;
  return res.json({
    valid: isValid,
    errors: arrayOfErrors,
  });
});

app.post("/api/verify-username", async (req, res) => {
  const { username } = req.query;
  const arrayOfErrors = await validator.verifyUsername(username);
  const isValid = arrayOfErrors.length === 0;
  return res.json({
    valid: isValid,
    errors: arrayOfErrors,
  });
});

let confirmationCode;
app.post("/api/confirm_email", async (req, res) => {
  const { email } = req.body;
  confirmationCode = await validator.confirmCode(email);
  return res.status(200);
});

app.post("/api/confirm_code", async (req, res) => {
  const { code } = req.body;
  const codeNumber = parseInt(code);
  const isValid = confirmationCode === codeNumber;
  return res.json({
    valid: isValid,
  });
});

app.post("/api/login", async (req, res) => {
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

app.post("/api/verify-token", (req, res) => {
  const token = req.header("Authorization").split(" ")[1];
  try {
    const decodedToken = jwt.verify(token, process.env.SECRET);
    return res.json(decodedToken);
  } catch (err) {
    return res.json({ error: "token missing or invalid" });
  }
});

const PORT = "3001";

app.listen(PORT, () => {
  console.log(`server is running on ${PORT}`);
});
