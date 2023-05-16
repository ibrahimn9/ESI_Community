import React from 'react'
import { Box, Stack } from "@mui/material";
import NavBar from '../containers/Admin/NavBar'
import Content from '../containers/Admin/Content';
const Admin = () => {
  const loggedUser = JSON.parse(window.localStorage.getItem("loggedUser"));
  if (loggedUser.token) return (
    <Box sx={{ background: '#EDF1F2', height: 'auto'}}>
        <NavBar />
        <Content />
    </Box>
  )
}

export default Admin
