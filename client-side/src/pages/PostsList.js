import React, { useState, useEffect } from "react";
import { Box, Stack } from "@mui/material";
import NavBar from "../containers/Admin/NavBar";
import { Post, AdminPost } from "../components";
import adminServices from "../services/adminServices";
import userServices from "../services/userServices";
import postService from "../services/postService";

const PostList = () => {
  const [posts, setPosts] = useState([]);
  const [users, setUsers] = useState([]);

  const getPosts = async () => {
    const posts = await postService.getAll()
    setPosts(posts);
    const { data } = await userServices.getAll();
    setUsers(data);
  };

  

  useEffect(() => {
    getPosts();
  }, [posts]);


  return (
    <Box sx={{ width: '100%', mb: 10, }}>
      <NavBar />
      <Box sx={{ width: {xs: '80%', lg: '50%'}, margin: 'auto'}}>
        {posts?.map((post) => {
          const author = users?.find((u) => u.id === post.user);
          return <AdminPost post={post} author={author} key={post.id} />;
        })}
      </Box>
    </Box>
  );
};

export default PostList;
