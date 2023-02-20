import React from "react";
import { Box } from "@mui/material";

import { NavBar, Header, Content, Source, Footer } from "../containers/Home";


const Home = () => {
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
