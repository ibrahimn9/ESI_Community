import { useState, useEffect } from "react";
import { Box, Stack } from "@mui/material";
import { Post } from "../../components";
import { useDispatch, useSelector } from 'react-redux';
import postService from "../../services/postService";
import Ranking from "./Ranking";
import Menu from "./Menu";

const Content = () => {

  const posts = useSelector((state) => state.post);

  const state = useSelector((state) => state)

  return (
    <Box>
      <Stack direction="row">
        <Menu />
        <Box sx={{ flexGrow: 1, px: { xs: 4, md: 0 } }}>
          {posts.map((post) => {
            const author = state.users.find(u => post.user === u.id);
            return <Post key={`${post.id}`} post={post} author={author} />
          })}
        </Box>
        <Ranking />
      </Stack>
    </Box>
  );
};

export default Content;
