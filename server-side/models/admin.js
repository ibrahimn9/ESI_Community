const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema({
    email: String,
    passwordHash: String,
    postsForCheck:[Object],
    blackList:[String]
});

adminSchema.set("toJSON", {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString();
      delete returnedObject._id;
      delete returnedObject.__v;
    },
  });
  
module.exports = mongoose.model("Admin",adminSchema);