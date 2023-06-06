import React, { useState, useEffect } from "react";
import NavBar from "../containers/Admin/NavBar";
import userServices from "../services/userServices";
import postService from "../services/postService";
import { Box, Stack } from "@mui/material";
import { images } from "../constants";

const Dashboard = () => {
  const [postsNum, setPostsNum] = useState(0);
  const [usersNum, setUsersNum] = useState(0);
  const [totalPoints, setTotalPoints] = useState(0);
  const [totalLikes, setTotalLikes] = useState(0);
  const [highBadge, setHighBadge] = useState(0);
  const [medBadge, setMedBadge] = useState(0);
  const [lowBadge, setLowBadge] = useState(0);
  const [upNum, setUpNum] = useState(0);
  const [downNum, setDownNum] = useState(0);
  const [drive1Storage, setDrive1Storage] = useState(0);
  const [drive2Storage, setDrive2Storage] = useState(0);

  

  const fetchData = async () => {
    const posts = await postService.getAll();
    setPostsNum(posts?.length);
    const { data } = await userServices.getAll();
    setUsersNum(data?.length);
    const totalPoints = data
      .map((u) => u.points)
      .reduce((sum, points) => sum + points, 0);
    setTotalPoints(totalPoints);
    const totalLikes = posts
      .map((p) => p.likes)
      .reduce((sum, likes) => sum + likes, 0);
    setTotalLikes(totalLikes);
    let highBadeg = 0;
    let medBadeg = 0;
    let lowBadeg = 0;
    data.map((u) => {
      if (u.points < 100) {
        lowBadeg++;
      } else if (u.points >= 100 && u.points < 1000) {
        medBadeg++;
      } else if (u.points >= 1000) {
        highBadeg++;
      }
    });
    highBadeg = (highBadeg * 100) / (usersNum || Infinity);
    medBadeg = (medBadeg * 100) / (usersNum || Infinity);
    lowBadeg = (lowBadeg * 100) / (usersNum || Infinity);
    setHighBadge(highBadeg.toFixed(1));
    setMedBadge(medBadeg.toFixed(1));
    setLowBadge(lowBadeg.toFixed(1));

    const upNum = posts
      .map((p) => p.up)
      .reduce((sum, up) => sum + up.length, 0);
    const downNum = posts
      .map((p) => p.down)
      .reduce((sum, down) => sum + down.length, 0);
    let total = upNum + downNum;
    let up = (upNum * 360) / total;
    let down = (downNum * 360) / total;
    setUpNum(up.toFixed(1));
    setDownNum(down.toFixed(1));

    let storage1 = posts
      .map((p) => p.fileSize)
      .reduce((sum, fileSize) => sum + fileSize, 0);


    let storage2 = posts
      .filter((p) => p.inserted)
      .map((p) => p.fileSize)
      .reduce((sum, fileSize) => sum + fileSize, 0);

    let totalDrive = 16106127360;
    storage1 = (storage1 * 100) / totalDrive;
    storage2 = (storage2 * 100) / totalDrive;
    setDrive2Storage(storage2.toFixed(2));
    setDrive1Storage(storage1.toFixed(2));
  };

  useEffect(() => {
    fetchData();
  });
  return (
    <Box sx={{ width: "100%" }}>
      <NavBar />
      <Box sx={{ width: "75%", margin: "auto", p: 6 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            background: "white",
            flexWrap: "wrap",
            px: 4,
            pt: 10,
            pb: 4,
            borderRadius: 4,
            boxShadow: "5px 5px  10px #E8E8EA",
            position: "relative",
          }}
        >
          <h2
            style={{
              margin: 0,
              position: "absolute",
              left: "50px",
              top: "15px",
              color: "#3C87F0",
              fontSize: "38px",
            }}
          >
            Statistics
          </h2>
          <Box
            sx={{
              background: "rgba(60, 135, 240, 0.75)",
              p: 2,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              borderRadius: 2,
              mr: 4,
              boxShadow: "5px 5px  10px #E8E8EA",
              width: "200px",
            }}
          >
            <h3
              style={{
                margin: 0,
                marginBottom: "15px",
                color: "white",
                fontSize: "26px",
              }}
            >
              Users Number
            </h3>
            <span
              style={{ color: "#F2C344", fontWeight: "600", fontSize: "22px" }}
            >
              {usersNum}
            </span>
          </Box>
          <Box
            sx={{
              background: "rgba(60, 135, 240, 0.75)",
              p: 2,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              borderRadius: 2,
              mr: 4,
              boxShadow: "5px 5px  10px #E8E8EA",
              width: "200px",
            }}
          >
            <h3
              style={{
                margin: 0,
                marginBottom: "15px",
                color: "white",
                fontSize: "26px",
              }}
            >
              Posts Created
            </h3>
            <span
              style={{ color: "#F2C344", fontWeight: "600", fontSize: "22px" }}
            >
              {postsNum}
            </span>
          </Box>
          <Box
            sx={{
              background: "rgba(60, 135, 240, 0.75)",
              p: 2,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              borderRadius: 2,
              mr: 4,
              boxShadow: "5px 5px  10px #E8E8EA",
              width: "200px",
            }}
          >
            <h3
              style={{
                margin: 0,
                marginBottom: "15px",
                color: "white",
                fontSize: "26px",
              }}
            >
              Total Points
            </h3>
            <span
              style={{ color: "#F2C344", fontWeight: "600", fontSize: "22px" }}
            >
              {totalPoints}
            </span>
          </Box>
          <Box
            sx={{
              background: "rgba(60, 135, 240, 0.75)",
              p: 2,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              borderRadius: 2,
              boxShadow: "5px 5px  10px #E8E8EA",
              width: "200px",
            }}
          >
            <h3
              style={{
                margin: 0,
                marginBottom: "15px",
                color: "white",
                fontSize: "26px",
              }}
            >
              Total Likes
            </h3>
            <span
              style={{ color: "#F2C344", fontWeight: "600", fontSize: "22px" }}
            >
              {totalLikes}
            </span>
          </Box>
        </Box>
        <Box
          sx={{
            background: "white",
            px: 4,
            py: 4,
            mt: 5,
            borderRadius: 4,
            boxShadow: "5px 5px  10px #E8E8EA",
          }}
        >
          <h2
            style={{
              margin: 0,
              color: "#3C87F0",
              fontSize: "38px",
            }}
          >
            Badges
          </h2>
          <Box sx={{ width: "80%", margin: "auto", mt: 4 }}>
            <Stack direction="row" sx={{ alignItems: "center", mb: 4 }}>
              <img src={images.highBadge} height={60} />
              <Box
                sx={{
                  width: "70%",
                  height: "35px",
                  background: "#EBE7E7",
                  borderRadius: 4,
                  ml: 2,
                  mr: 4,
                }}
              >
                <Box
                  sx={{
                    height: "100%",
                    background: "#3C87F0",
                    width: `${highBadge}%`,
                    borderRadius: 4,
                    transition: "width 0.3s ease-in-out",
                  }}
                ></Box>
              </Box>
              <span
                style={{
                  color: "#F2C344",
                  fontWeight: "800",
                  fontSize: "22px",
                }}
              >
                {highBadge}%
              </span>
            </Stack>
            <Stack direction="row" sx={{ alignItems: "center", mb: 4 }}>
              <img src={images.medBadge} height={60} />
              <Box
                sx={{
                  width: "70%",
                  height: "35px",
                  background: "#EBE7E7",
                  borderRadius: 4,
                  ml: 2,
                  mr: 4,
                  overflow: 'hidden',
                }}
              >
                <Box
                  sx={{
                    height: "100%",
                    background: "#3C87F0",
                    width: `${medBadge}%`,
                    borderRadius: 4,
                    transition: "width 0.3s ease-in-out",
                  }}
                ></Box>
              </Box>
              <span
                style={{
                  color: "#F2C344",
                  fontWeight: "800",
                  fontSize: "22px",
                }}
              >
                {medBadge}%
              </span>
            </Stack>
            <Stack direction="row" sx={{ alignItems: "center" }}>
              <img src={images.lowBadge} height={60} />
              <Box
                sx={{
                  width: "70%",
                  height: "35px",
                  background: "#EBE7E7",
                  borderRadius: 4,
                  ml: 2,
                  mr: 4,
                  overflow: 'hidden',
                }}
              >
                <Box
                  sx={{
                    height: "100%",
                    background: "#3C87F0",
                    width: `${lowBadge}%`,
                    borderRadius: 4,
                    transition: "width 0.3s ease-in-out",
                  }}
                ></Box>
              </Box>
              <span
                style={{
                  color: "#F2C344",
                  fontWeight: "800",
                  fontSize: "22px",
                }}
              >
                {lowBadge}%
              </span>
            </Stack>
          </Box>
        </Box>
        <Box
          sx={{
            background: "white",
            px: 4,
            py: 4,
            mt: 5,
            borderRadius: 4,
            boxShadow: "5px 5px  10px #E8E8EA",
          }}
        >
          <h2
            style={{
              margin: 0,
              color: "#3C87F0",
              fontSize: "38px",
            }}
          >
            Up VS Down
          </h2>
          <Box
            sx={{
              height: "300px",
              width: "300px",
              borderRadius: "50%",
              margin: "auto",
              background: `conic-gradient(#F2C344 0deg ${upNum}deg, #3C87F0 ${downNum}deg 360deg)`,
              mt: 4,
            }}
          ></Box>
          <Box>
            <Stack direction="row" sx={{ alignItems: "center", mb: 2 }}>
              <Box
                sx={{
                  width: "40px",
                  height: "40px",
                  background: "#F2C344",
                  borderRadius: 2,
                  mr: 2,
                }}
              />
              <span
                style={{
                  color: "#04396A",
                  fontWeight: "800",
                  fontSize: "22px",
                }}
              >
                Up
              </span>
            </Stack>
            <Stack direction="row" sx={{ alignItems: "center", mb: 2 }}>
              <Box
                sx={{
                  width: "40px",
                  height: "40px",
                  background: "#3C87F0",
                  borderRadius: 2,
                  mr: 2,
                }}
              />
              <span
                style={{
                  color: "#04396A",
                  fontWeight: "800",
                  fontSize: "22px",
                }}
              >
                Down
              </span>
            </Stack>
          </Box>
        </Box>
        <Box
          sx={{
            background: "white",
            px: 4,
            pt: 4,
            pb: 6,
            mt: 5,
            borderRadius: 4,
            boxShadow: "5px 5px  10px #E8E8EA",
          }}
        >
          <h2
            style={{
              margin: 0,
              color: "#3C87F0",
              fontSize: "38px",
            }}
          >
            Storage
          </h2>
          <Box sx={{ width: '80%', margin: 'auto', mt: 4, }}>
            <Stack direction="row" sx={{ alignItems: "center" }}>
              <span
                style={{
                  color: "#04396A",
                  fontSize: "26px",
                  fontWeight: "800",
                }}
              >
                Drive 1:
              </span>
              <Box
                sx={{
                  width: "70%",
                  height: "35px",
                  background: "#EBE7E7",
                  borderRadius: 4,
                  overflow: 'hidden',
                  ml: 2,
                  mr: 4,
                }}
              >
                <Box
                  sx={{
                    height: "100%",
                    background: "#3C87F0",
                    width: `${drive1Storage}%`,
                    borderRadius: 4,
                    transition: "width 0.3s ease-in-out",
                  }}
                ></Box>
              </Box>
              <span
                style={{
                  color: "#F2C344",
                  fontWeight: "800",
                  fontSize: "22px",
                }}
              >
                {drive1Storage}%
              </span>
            </Stack>
            <Stack direction="row" sx={{ alignItems: "center", mt: 4 }}>
              <span
                style={{
                  color: "#04396A",
                  fontSize: "26px",
                  fontWeight: "800",
                }}
              >
                Drive 2:
              </span>
              <Box
                sx={{
                  width: "70%",
                  height: "35px",
                  background: "#EBE7E7",
                  borderRadius: 4,
                  overflow: 'hidden',
                  ml: 2,
                  mr: 4,
                }}
              >
                <Box
                  sx={{
                    height: "100%",
                    background: "#3C87F0",
                    width: `${drive2Storage}%`,
                    borderRadius: 4,
                    transition: "width 0.3s ease-in-out",
                  }}
                ></Box>
              </Box>
              <span
                style={{
                  color: "#F2C344",
                  fontWeight: "800",
                  fontSize: "22px",
                }}
              >
                {drive2Storage}%
              </span>
            </Stack>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
