const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    title: String,
    description: { type: String, minLenght: 10, required: true },
    url: String,
    user: String,
    likes: { type: Number, default: 0 },
    comments: [Object],
    tags: [String]
  },
  { timestamps: true }
);

postSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model("Post", postSchema);
