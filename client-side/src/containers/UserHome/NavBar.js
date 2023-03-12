import { Box, Stack } from "@mui/material";
import { images } from "../../constants";
import { Link } from "react-router-dom";

import { FiSearch } from "react-icons/fi";
import { RiNotification3Line } from "react-icons/ri";
import { FiMenu } from "react-icons/fi";

import SearchBar from "../../components/SearchBar";

const NavBar = () => {
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
        <button className="navtxt-btn nav-btn btn">Create Post</button>
        <button className="nos-btn btn">
          <RiNotification3Line />
        </button>
        <img
          src={images.defaultUserPic}
          style={{ height: "60px", width: "60px", borderRadius: "50%" }}
        />
      </Box>
    </Stack>
  );
};

export default NavBar;
