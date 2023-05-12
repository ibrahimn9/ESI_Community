const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, minLenght: 5 },
  email: { type: String, minLenght: 10 },
  passwordHash: { type: String, minLenght: 8 },
  class: { class: Number, specialty: String },
  pic: String,
  points: { type: Number, default: 0 },
  folowers: [String],
  folowing: [String],
  bookmarks: [String],
  posts: [String],
  bio: String,
  brandColor: String,
  notifications: [{ postId: String, text: String }],
});

userSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
    delete returnedObject.passwordHash;
  },
});

module.exports = mongoose.model("User", userSchema);
