const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const adminRouter = require("express").Router();

const config = require('../utils/config')

const Admin = require('../models/admin');
const Post = require('../models/post');
const User = require('../models/user');


adminRouter.get('/', async(req, res) => {
    const admin = await Admin.findOne({});
    return res.json(admin);
})


adminRouter.post("/loginAdmin", async (req, res) => {
    const { email, password } = req.body;
    const admin = await Admin.findOne({ email });
    const passwordCorrect = admin === null ? false : await bcrypt.compare(password, admin.passwordHash);
    
    if (!(admin && passwordCorrect)) {
        return res.json({ error: "invalid email or password",});
    }
    const userForToken = {
        email: admin.email,
        id: admin._id,
    };

    token = jwt.sign(userForToken, process.env.SECRET);
    res.status(200).json({ token, email: admin.email, id: admin._id });
    });

    
    

adminRouter.post('/addToPostsForCheck',async (req,res) => {
    const token = req.header("Authorization").split(" ")[1];
    const decodedToken = jwt.verify(token, config.SECRET);
    if (!decodedToken) {
      return res.status(400);
    }
    const { post } = req.body;
    const admin = await Admin.findOne({})
    admin.postsForCheck = admin.postsForCheck.concat({ ...post, });
    await admin.save();
    return res.status(200).json({ message: "post added to admin succeffuly" });
})

adminRouter.post('/deletePost',async (req,res) =>{
    const { id } = req.body;
    console.log(id)
    const admin = await Admin.findOne({});
    admin.postsForCheck = admin.postsForCheck.filter((elm) => elm.id !== id );
    await admin.save();
    const postmodified = await Post.findByIdAndDelete(id);
    return res.json({message: "post deleted succeffuly"});
})


adminRouter.post('/deleteAccount',async (req,res) => {
  const token = req.header("Authorization").split(" ")[1];
  const decodedToken = jwt.verify(token, config.SECRET);
  if (!decodedToken) {
    return res.status(400);
  }

  const {id, email} = req.body;
  const admin = await Admin.findOne({});
  
  const user = await User.findById(id);
  if(!user){
    return res.json({message : "there is no user"})
  }
  const posts =  user.posts;
  for( i=0;i< posts.length; i++){
    const deleted = await Post.findByIdAndDelete(posts[i]);
  }
  admin.blackList =  admin.blackList.concat(email);
  await User.findByIdAndRemove(id);
  await admin.save();
  return res.json({message: "account deleted"}) 
})

adminRouter.post('/sendNotification',async (req,res) => {
  
  const token = req.header("Authorization").split(" ")[1];
  const decodedToken = jwt.verify(token, config.SECRET);
  if (!decodedToken) {
    return res.status(400);
  }
  const { message } = req.body;
  const users = await User.find({});
  for( i = 0 ;i< users.length;i++){
    users[i].notifications =  users[i].notifications.concat({text: message});
    await users[i].save();
  }
  
  return res.json({message:"message saved to users"});
})

module.exports =  adminRouter;
