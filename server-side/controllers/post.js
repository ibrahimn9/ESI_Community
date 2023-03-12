const jwt = require("jsonwebtoken");
const validator = require("../utils/validator");
const config = require('../utils/config')

const postRouter = require("express").Router();

const Post = require("../models/post");
const User = require("../models/user");

postRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs.map((blog) => blog.toJSON()));
});

postRouter.post('/create_post', async (req, res) => {
  const { title, description, userID } = req.body;
  //const token = request.header("Authorization").split(" ")[1];
  //const decodedToken = jwt.verify(token, config.SECRET);

  // if (!token || !decodedToken.id)
  //   return response.status(401).json({ error: "token missing or invalid" });


  // if (!title || !description)
  //   return response.status(400).json({ error: "title or url is missing" });

  // const user = await User.findById(userID);
  // console.log(user)

  const post = new Post({
    title,  
    description,
    //user: user.id,
  });

  const savedPost = await post.save();
  // user.posts = user.posts.concat(savedPost._id);
  // await user.save();

  res.json(savedPost.toJSON());

});

module.exports = postRouter;
