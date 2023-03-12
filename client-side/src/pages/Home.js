import { useEffect, useState } from "react";
import { Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import user from "../services/userServices";

import { NavBar, Header, Content, Source, Footer } from "../containers/Home";




const Home = () => {
  const navigate = useNavigate();

  const verifyToken = async () => {
    const loggedUser = JSON.parse(window.localStorage.getItem("loggedUser"))
    const { data } = await user.sendToken(loggedUser.token) 
    const { id } = data
    navigate(`/user_home/${id}`)
  }

  useEffect(() => {
    if (window.localStorage.getItem("loggedUser")) {
    verifyToken();
    }
  }, [])


  return (
    <Box
      className="home"
      sx={{
        backgroundColor: "#1e1f24",
        height: 'auto',
      }}
    >
      <NavBar />
      <Header />
      <Content />
      <Source />
      <Footer />
    </Box>
  );
};

export default Home;
