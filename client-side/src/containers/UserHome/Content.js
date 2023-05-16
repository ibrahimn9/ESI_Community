import { useState, useEffect } from "react";
import { Box, Stack } from "@mui/material";
import { Post } from "../../components";
import { useDispatch, useSelector } from "react-redux";
import postService from "../../services/postService";
import Ranking from "./Ranking";
import Menu from "./Menu";
import { useNavigate } from "react-router-dom";
import { Footer } from "../Home";

const Content = () => {
  const navigate = useNavigate();
  const posts = useSelector((state) => state.post);

  const state = useSelector((state) => state);

  const years = ["1CPI", "2CPI", "1CS", "2CS", "3CS"];

  let userZone = [];

  for (let i = 0; i < state.user.class?.class - 1; i++) {
    userZone = userZone.concat(years[i]);
  }

  const switchUserYear = (year) => {
    let switchedYear;
    switch (year) {
      case 1:
        switchedYear = "1CPI";
        break;
      case 2:
        switchedYear = "2CPI";
        break;
      case 3:
        switchedYear = "1CS";
        break;
      case 4:
        switchedYear = "2CS";
        break;
      case 5:
        switchedYear = "3CS";
        break;
    }
    return switchedYear;
  };

  const userYear = switchUserYear(state.user.class?.class);

  const followingPosts = posts?.filter((p) =>
    state.user.folowing?.includes(p.user)
  );

  const currPosts = posts?.filter(
    (p) => p.path.year === userYear && !state.user.folowing?.includes(p.user)
  );

  const lowerPosts = posts?.filter(
    (p) =>
      userZone.includes(p.path.year) && !state.user.folowing?.includes(p.user)
  );

  let filtredPosts = [];
  filtredPosts = filtredPosts.concat(followingPosts);
  filtredPosts = filtredPosts.concat(currPosts);
  filtredPosts = filtredPosts.concat(lowerPosts);

  const handleCreatePostClick = () => {
    navigate("/user_home/create_post");
  };

  if(!posts) return <h1>Loading ...</h1>

  return (
    <Box
      className='content'
    >
      <Box sx={{ width: '80%', display: {md : 'none'}}}>
        <button
          className="navtxt-btn ds nav-btn btn"
          onClick={handleCreatePostClick}
          style={{ width: '100%'}}
        >
          Create Post
        </button>
      </Box>
      <Stack direction="row">
        <Menu />
        <Box sx={{ flexGrow: 1, px: { xs: 4, md: 0 }, position: 'sticky' }}>
          {filtredPosts?.map((post) => {
            const author = state.users.find((u) => post.user === u.id);
            return (
              <Post
                key={`${post.id}/${post.user}`}
                post={post}
                author={author}
              />
            );
          })}
        </Box>
        <Ranking />
      </Stack>
      <Footer />
    </Box>
  );
};

export default Content;
