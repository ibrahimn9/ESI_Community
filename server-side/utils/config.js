require("dotenv").config();

const PORT = process.env.PORT;
const SECRET = process.env.SECRET;
const MONGODB_URI = process.env.MONGODB_URI
const USER_URI = process.env.USER_URI
const POST_URI = process.env.POST_URI
module.exports = {
  MONGODB_URI,
  USER_URI,
  POST_URI,
  SECRET,
  PORT,
};