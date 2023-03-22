import { useEffect, useState } from 'react'

import { Box, Stack } from "@mui/material";
import { images } from "../../constants";
import { useNavigate } from "react-router-dom";

import { FiSearch } from "react-icons/fi";
import { RiNotification3Line } from "react-icons/ri";
import { FiMenu } from "react-icons/fi";

import { SearchBar } from "../../components";
import userServices from '../../services/userServices';

const NavBar = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState();
  const loggedUser = JSON.parse(window.localStorage.getItem('loggedUser'));

  const getUser = async() => {
    const { data } = await userServices.getOne(loggedUser.id);
    setUser(data)
  }

  useEffect(() => {
    getUser();
  }, [])

  const handleCreatePostClick = () => {
    navigate('/user_home/create_post');
  };

  return (
    <Stack
      direction="row"
      alignItems="center"
      px={{ xs: 4, lg: 15 }}
      sx={{
        top: "0",
        background: "#FFFFFF",
        justifyContent: "space-between",
        boxShadow: "0 2px 4px #e3e3e3",
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <button className="nos-btn menu-btn btn">
          <FiMenu />
        </button>
        <h2 style={{ color: "black", marginRight: "15px" }}>Logo</h2>
        <SearchBar />
      </Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-around",
        }}
      >
        <button
          className="navtxt-btn nav-btn btn"
          onClick={handleCreatePostClick}
        >
          Create Post
        </button>
        <button className="nos-btn btn">
          <RiNotification3Line />
        </button>
        <img
          src={
            user?.pic
              ? `https://drive.google.com/uc?export=view&id=${user?.pic}`
              : images.defaultUserPic
          }
          style={{ height: "40px", width: "40px", borderRadius: "50%", marginLeft: '15px' }}
        />
      </Box>
    </Stack>
  );
};

export default NavBar;
