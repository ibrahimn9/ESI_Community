import { useState, useEffect } from "react";
import { Box, Stack } from "@mui/material";
import { Post } from "../../components";
import postService from "../../services/postService";

const Content = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    postService.getAll().then((posts) => setPosts(posts));
  }, []);

  return (
    <Box>
      <Stack direction="row">
        <div className="left">left</div>
        <Box sx={{ flexGrow: 1 }}>
          {posts.map((post) => (
            <Post key={post.id} post={post} />
          ))}
        </Box>
        <div className="right">right</div>
      </Stack>
    </Box>
  );
};

export default Content;
