require("dotenv").config();
const mongoose = require("mongoose");
const url = process.env.USER_URI;

mongoose
  .set("strictQuery", false)
  .connect(url)
  .then(() => console.log("connected to the database"))
  .catch((error) => error.message);

const userSchema = new mongoose.Schema({
  name: { type: String, minLenght: 5, required: true },
  email: { type: String, minLenght: 10, required: true },
  passwordHash: { type: String, minLenght: 8, required: true },
  class: { class: Number, specialty: String },
  pic: String,
  points: Number,
  folowers: [String],
  folowing: [String],
  bookmarks: [String],
  posts: [String],
});

userSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
    delete returnedObject.passwordHash
  },
});

module.exports = mongoose.model("User", userSchema);
