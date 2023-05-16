import React from "react";
import { useState, useEffect } from "react";
import { Box, Stack } from "@mui/material";
import NavBar from "../containers/Admin/NavBar";
import userServices from "../services/userServices";
import { UserDetail } from "../components";

const UsersList = () => {
  const [users, setUsers] = useState([]);
  const [topUsers, setTopUsers] = useState([]);

  const getUsers = async () => {
    const { data } = await userServices.getAll();
    data.sort((a, b) => b.points - a.points);
    setUsers(data);
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <Box sx={{ width: "100%", mb: 10 }}>
      <NavBar />
      <Box
        sx={{
          width: { xs: "100%", lg: "50%" },
          margin: "auto",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            border: "1px solid #E8E8EA",
            boxShadow: "5px 5px  10px #E8E8EA",
            height: "auto",
            width: "100%",
            background: "#FDFDFD",
            borderRadius: "10px",
            mt: 2,
            py: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
          }}
        >
          {users?.map((user, index) => (
            <UserDetail key={`${user.email}`} user={user} rank={index + 1} />
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default UsersList;
