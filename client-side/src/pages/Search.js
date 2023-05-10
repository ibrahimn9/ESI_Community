import { useState, useEffect } from "react";
import { Box, Stack } from "@mui/material";
import Menu from "../containers/UserHome/Menu";
import { NavBar } from "../containers/UserHome";
import { Footer } from "../containers/Home";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import Post from "../components/Post";

import userServices from "../services/userServices";
import postService from "../services/postService";
import { hasCommonCharsInOrder } from "../constants/hasCommonCharsInOrder";
import { strArrayHasCommonCharsInOrder } from "../constants/hasCommonCharsInOrder";

const Search = () => {
  const { searchTerm } = useParams();
  const [posts, setPosts] = useState([]);
  const [users, setUsers] = useState([]);
  const [filteredPosts, setFiltredPosts] = useState([]);

  const getPosts = async () => {
    const posts = await postService.getAll();
    const filteredPosts = posts.filter((p) =>
      strArrayHasCommonCharsInOrder(searchTerm, p.tags)
    );
    setFiltredPosts(filteredPosts);
  };

  const getUsers = async () => {
    const { data } = await userServices.getAll();
    setUsers(data);
  };

  useEffect(() => {
    getUsers();
    getPosts();
  }, []);

  if (filteredPosts.length === 0) {
    return (
      <Box>
        <NavBar />
        <Stack direction="row" sx={{ background: "#EDF1F2" }}>
          <Menu />
          <Box sx={{ flexGrow: 1, px: { xs: 4, md: 8 } }}>
            <h2 style={{ color: '#04396A'}}>No results found for your search term.</h2>
          </Box>
        </Stack>
      </Box>
    );
  }

  return (
    <Box sx={{ background: "#EDF1F2", height: 'auto' }}>
      <NavBar />
      <Stack direction="row" sx={{ background: "#EDF1F2", mb: 2 }}>
        <Menu />
        <Box sx={{ flexGrow: 1, px: { xs: 4, md: 8 } }}>
          <h2 style={{ color: '#04396A'}}>
            {`Found ${filteredPosts.length} ${
              filteredPosts.length === 1 ? "post" : "posts"
            } that match:`}&nbsp;<span style={{ color: '#3C87F0BF', marginRight: '15px'}}>{searchTerm}</span>
          </h2>

          {filteredPosts?.map((fp) => {
            const author = users?.find((u) => fp.user === u.id);
            return <Post key={fp.id} post={fp} author={author} />;
          })}
        </Box>
      </Stack>
      <Footer />
    </Box>
  );
};

export default Search;
