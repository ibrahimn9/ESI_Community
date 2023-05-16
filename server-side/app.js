const config = require("./utils/config");
const express = require("express");
const app = express();
const cors = require("cors");


const logger = require("./utils/logger");
const mongoose = require("mongoose");
const morgan = require("morgan");



morgan.token("post", (req, res) => {
  if (req.method === "POST") return JSON.stringify(req.body);
  else return "";
});

morgan.format(
  "postFormat",
  ":method :url :status :res[content-length] - :response-time ms | :post"
);

app.use(morgan("postFormat"));


const userRouter = require("./controllers/user");
const postRouter = require("./controllers/post");
const adminRouter = require('./controllers/admin')

logger.info("connecting to", config.MONGODB_URI);
mongoose.set('strictQuery', false)
mongoose
  .connect(config.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    logger.info("connected to the database");
  })
  .catch((error) => {
    logger.error("error connecting to the database:", error.message);
  });

  

app.use(cors());
app.use(express.static("build"));
app.use(express.json());

app.use("/api/user", userRouter);
app.use("/api/post", postRouter);
app.use("/api/admin", adminRouter);


module.exports = app;