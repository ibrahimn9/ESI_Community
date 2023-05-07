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

const Menu = () => {
  const [selectedCategory, setSelectedCategory] = useState("Latest");
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
              onClick={() => setSelectedCategory(`${cat.name}`)}
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
              onClick={() => setSelectedCategory(`${cat.name}`)}
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
          <Box className="sch-box">
            <h3>1CP</h3>
            <FaChevronRight />
          </Box>
          <Box className="sch-box">
            <h3>2CP</h3>
            <FaChevronRight />
          </Box>
          <Box className="sch-box">
            <h3>1CS</h3>
            <FaChevronRight />
          </Box>
          <Box className="sch-box">
            <h3>2CS</h3>
            <FaChevronRight />
          </Box>
          <Box className="sch-box">
            <h3>3CS</h3>
            <FaChevronRight />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Menu;
