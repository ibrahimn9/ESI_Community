import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Stack } from "@mui/material";
import { images } from "../../constants";
import { rankEnum } from "../../constants/rankEnum";
import { userBadge } from "../../constants/userBadge";

const UserDetail = ({ user, rank }) => {
  const { e, c } = rankEnum(rank);
  const navigate = useNavigate();

  const handleProfileClick = () => {
    navigate(`/user_profile/${user.id}`);
  };

  return (
    <Box
      sx={{
        border: "2px solid #E8E8EA",
        height: "80px",
        width: "75%",
        borderRadius: "10px",
        display: "flex",
        alignItems: "center",
        px: 2,
        mt: 1,
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div className="rank-detail" style={{ borderLeft: `40px solid ${c}` }} />
      <h4 className="rank">
        {rank}
        {e}
      </h4>
      <Box sx={{ position: "relative" }}>
        <img
          src={
            user?.pic
              ? `https://drive.google.com/uc?export=view&id=${user?.pic}`
              : images.defaultUserPic
          }
          style={{
            height: "50px",
            width: "50px",
            borderRadius: "50%",
            display: "inline",
            marginRight: "5px",
            border: `2px solid ${c}`,
            objectFit: "cover",
          }}
        />
        <img src={userBadge(user.points)} className="badge" />
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          ml: 2,
        }}
      >
        <h3
          style={{ margin: "0", color: "#04396A", cursor: "pointer" }}
          onClick={handleProfileClick}
        >
          {user.name}
        </h3>
        <h3 style={{ margin: "0", color: "#3C87F0" }}>{user.points}</h3>
      </Box>
    </Box>
  );
};

export default UserDetail;
