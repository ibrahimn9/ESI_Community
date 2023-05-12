import React from "react";
import { Box, Stack } from "@mui/material";
import { useState, useEffect } from "react";
import { homeCategory } from "../../constants/categories";
import { profileCategory } from "../../constants/categories";
import { MdOutlineTipsAndUpdates } from "react-icons/md";
import { AiOutlineFire } from "react-icons/ai";
import { FaDatabase } from "react-icons/fa";
import { FaUserAlt } from "react-icons/fa";
import { IoMdSettings } from "react-icons/io";
import { FaChevronRight } from "react-icons/fa";
import { useNavigate, Link } from "react-router-dom";

const Menu = () => {
  const [selectedCategory, setSelectedCategory] = useState("Latest");
  const navigate = useNavigate()
  const loggedUser = JSON.parse(window.localStorage.getItem("loggedUser"));

  const handleProfileClick = (name) => {
    let link;
    if(name === 'Profile') {
      link = `/user_profile/${loggedUser.id}`;
    }
    else {
      link = '/settings';
    }
    navigate(link)
    setSelectedCategory(name)
  };

  const handleHomeClick = (name) => {
    if(name === 'Database') {
      window.open('https://drive.google.com/drive/folders/181SZoGqQjao9ItNZhtzqtewMtkqRJnl9?usp=share_link', '_blank');
    }
    else {
      setSelectedCategory(name)
    }
  }

  return (
    <Box
      sx={{
        flexBasis: "30%",
        position: "sticky",
        height: "",
        display: { xs: "none", md: "flex" },
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          border: "1px solid #E8E8EA",
          boxShadow: "5px 5px  10px #E8E8EA",
          width: "60%",
          background: "#FDFDFD",
          borderRadius: "10px",
          mt: 2,
          p: 4,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <h4 style={{ color: "#04396A", margin: "0" }}>Home</h4>
        <Box sx={{ mt: 3, mb: 4 }}>
          {homeCategory.map((cat) => (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                mb: 3,
                cursor: "pointer",
              }}
              onClick={() => handleHomeClick(cat.name)}
              className={selectedCategory === cat.name ? "active-cat" : "cat"}
              key={cat.name}
            >
              <span
                className={selectedCategory === cat.name ? "active-icon" : ""}
              >
                {cat.icon}
              </span>
              <h4 style={{ margin: "0", marginBottom: "5px" }}>{cat.name}</h4>
            </Box>
          ))}
        </Box>
        <h4 style={{ color: "#04396A", margin: "0" }}>My Profile</h4>
        <Box sx={{ mt: 3, mb: 4 }}>
          {profileCategory.map((cat) => (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                mb: 3,
                cursor: "pointer",
              }}
              onClick={() => handleProfileClick(cat.name)}
              className={selectedCategory === cat.name ? "active-cat" : "cat"}
              key={cat.name}
            >
              <span
                className={selectedCategory === cat.name ? "active-icon" : ""}
              >
                {cat.icon}
              </span>
              <h4 style={{ margin: "0", marginBottom: "5px" }}>{cat.name}</h4>
            </Box>
          ))}
        </Box>
        <h4 style={{ color: "#04396A", margin: "0" }}>Search</h4>
        <Box sx={{ mt: 3, mb: 2 }}>
          <a
            href="https://drive.google.com/drive/u/2/folders/1ywPx1YV-WW7z78YLvSE3waruiQaJO_H7"
            target="_blank"
          >
            <Box className="sch-box">
              <h3>1CP</h3>
              <FaChevronRight />
            </Box>
          </a>

          <a
            href="https://drive.google.com/drive/u/2/folders/1AwpbDyoHdmSLYjaUfIqVh3FSH_tQ1yvi"
            target="_blank"
          >
            <Box className="sch-box">
              <h3>2CP</h3>
              <FaChevronRight />
            </Box>
          </a>

          <a
            href="https://drive.google.com/drive/u/2/folders/1bQ2wua8EWD2yTjFvh8gNhwZ78Bf9Qq_h"
            target="_blank"
          >
            <Box className="sch-box">
              <h3>1CS</h3>
              <FaChevronRight />
            </Box>
          </a>

          <a
            href="https://drive.google.com/drive/u/2/folders/1uKYdGDqzpDaDRYDX13_CO5eKVCITSFRr"
            target="_blank"
          >
            <Box className="sch-box">
              <h3>2CS</h3>
              <FaChevronRight />
            </Box>
          </a>

          <a
            href="https://drive.google.com/drive/u/2/folders/1oleGZ6tHG51P-YbUGgL6Mqfu9JghaHCT"
            target="_blank"
          >
            <Box className="sch-box">
              <h3>3CS</h3>
              <FaChevronRight />
            </Box>
          </a>
        </Box>
      </Box>
    </Box>
  );
};

export default Menu;
