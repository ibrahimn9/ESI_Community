import React, { useState } from "react";
import { Stack, Box, Typography } from "@mui/material";
import NavBar from "../containers/Admin/NavBar";
import { BiLoaderAlt } from "react-icons/bi";
import adminServices from "../services/adminServices";

const AdminNotification = () => {
  const [noti, setNoti] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const loggedUser = JSON.parse(window.localStorage.getItem("loggedUser"));

  const confirmClick = async () => {
    setIsLoading(true);
    const { data } = await adminServices.sendNotification({ message: noti}, loggedUser.token)
    if (data) setIsLoading(false);
  };

  return (
    <Box>
      <NavBar />
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "50vh",
        }}
      >
        <Box
          sx={{
            background: "white",
            height: "auto",
            width: { xs: "60%", md: "40%" },
            mb: 4,
            boxShadow: "5px 5px  10px #E8E8EA",
            borderRadius: 4,
            display: "flex",
            flexDirection: "column",
            px: 8,
            py: 2,
            pb: 4,
          }}
        >
          <h1 style={{ color: "#3C87F0" }}>Send your notification</h1>
          <Box sx={{ display: "flex", flexDirection: "column", mb: 4 }}>
            <span style={{ color: "#04396A", marginBottom: "10px" }}>
              Notification
            </span>
            <textarea
              value={noti}
              className="input-tags"
              onChange={(e) => setNoti(e.target.value)}
            />
          </Box>
          <button
            className="btn post-btn"
            disabled={!noti || isLoading}
            onClick={confirmClick}
            style={{ display: "flex", alignItems: "center", justifyContent: 'center', margin: 0 }}
          >
            Send
            {isLoading && <BiLoaderAlt className="loading" />}
          </button>
          
        </Box>
      </Box>
    </Box>
  );
};

export default AdminNotification;
