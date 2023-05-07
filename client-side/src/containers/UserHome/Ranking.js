import { useState, useEffect } from "react";
import { Box, Stack } from "@mui/material";
import { images } from "../../constants";
import UserDetail from "./UserDetail";
import userServices from "../../services/userServices";

const Ranking = () => {
  const [users, setUsers] = useState(null);
  const getUsers = async () => {
    const { data } = await userServices.getAll();
    data.sort((a, b) => b.points - a.points);
    setUsers(data);
  };

  useEffect(() => {
    getUsers();
  }, []);


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
          height: "auto",
          width: "75%",
          background: "#FDFDFD",
          borderRadius: "10px",
          mt: 2,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          position: "relative",
        }}
      >
        <h3
          style={{
            position: "absolute",
            left: "0",
            marginLeft: "26px",
            color: "#04396A",
          }}
        >
          Ranking
        </h3>
        <Box sx={{ mt: 7 }} />
        {users?.map((user, index) => (
          <UserDetail
            key={`${user.email}`}
            user={user}
            rank={index + 1}
          />
        ))}
        <button className="secondary-btn btn">Show All</button>
      </Box>
    </Box>
  );
};

export default Ranking;
