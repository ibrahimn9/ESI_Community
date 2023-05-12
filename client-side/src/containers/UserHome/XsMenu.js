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
import { useRef } from "react";
import { useNavigate } from "react-router-dom";

const XsMenu = ({ moveX, setMoveX }) => {
  const [selectedCategory, setSelectedCategory] = useState("Latest");
  const menuRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMoveX("-450px");
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuRef]);

  return (
    <Box
      sx={{
        width: "400px",
        position: "absolute",
        height: "200vh",
        display: { xs: "flex", md: "none" },
        zIndex: "100",
        justifyContent: "center",
        top: 0,
        left: moveX || "-450px",
        transition: ".3s ease-in-out",
      }}
      ref={menuRef}
    >
      <Box
        sx={{
          border: "1px solid #E8E8EA",
          boxShadow: "5px 5px  10px #E8E8EA",
          width: "60%",
          background: "#FDFDFD",
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
              onClick={() => {
                setSelectedCategory(`${cat.name}`);
                setMoveX("-450px");
              }}
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
              onClick={() => {
                setSelectedCategory(`${cat.name}`);
                setMoveX("-450px");
              }}
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

export default XsMenu;
