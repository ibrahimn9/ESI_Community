import React, { useState, useEffect } from "react";
import NavBar from "../containers/Admin/NavBar";
import userServices from "../services/userServices";
import postService from "../services/postService";

const Dashboard = () => {
  const [postsNum, setPostsNum] = useState(0);
  const [usersNum, setUsersNum] = useState(0);
  const [totalPoints, setTotalPoints] = useState(0);
  const [totalLikes, setTotalLikes] = useState(0);
  const [highBadge, setHighBadge] = useState(0);
  const [medBadge, setMedBadge] = useState(0);
  const [lowBadge, setLowBadge] = useState(0);
  const [upNum, setUpNum] = useState(0)
  const [downNum, setDownNum] = useState(0)
  const [drive1Storage, setDrive1Storage] = useState(0)
  const [drive2Storage, setDrive2Storage] = useState(0)

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
        lowBadeg++
      } else if (u.points >= 100 && u.points < 1000) {
        medBadeg++
      } else if (u.points >= 1000) {
        highBadeg++
      }
    });
    highBadeg = highBadeg * 100 / usersNum;
    medBadeg = medBadeg * 100 / usersNum;
    lowBadeg = lowBadeg * 100 / usersNum;
    setHighBadge(highBadeg.toFixed(1))
    setMedBadge(medBadeg.toFixed(1))
    setLowBadge(lowBadeg.toFixed(1))

    const upNum = posts.map(p => p.up).reduce((sum, up) => sum + up.length, 0);
    const downNum = posts.map(p => p.down).reduce((sum, down) => sum + down.length, 0);
    let total = upNum + downNum
    let up = upNum * 360 / total
    let down = downNum * 360 / total
    setUpNum(up.toFixed(1))
    setDownNum(down.toFixed(1))
  
    let storage1 = posts.map(p => p.fileSize).reduce((sum, fileSize) => sum + fileSize, 0)
    let storage2 = posts.filter(p => p.inserted).map(p => p.fileSize).reduce((sum, fileSize) => sum + fileSize, 0)
    let totalDrive = 16106127360
    storage1 = storage1 * 100 / totalDrive
    storage2 = storage2 * 100 / totalDrive
    setDrive1Storage(storage1.toFixed(1))
    setDrive2Storage(storage2.toFixed(1))

  };

  useEffect(() => {
    fetchData();
  });
  return (
    <div>
      <h3>Posts created: {postsNum}</h3>
      <h3>Number of users: {usersNum}</h3>
      <h3>Total points: {totalPoints}</h3>
      <h3>Total likes: {totalLikes}</h3>
      <h3>High badge number: {highBadge}%</h3>
      <h3>Med badge number: {medBadge}%</h3>
      <h3>Low badge number: {lowBadge}%</h3>
      <h3>Number of UPs: {upNum}deg</h3>
      <h3>Number of Downs: {downNum}deg</h3>
      <h3>Drive 1 storage: {drive1Storage}%</h3>
      <h3>Drive 2 storage: {drive2Storage}%</h3>
    </div>
  );
};

export default Dashboard;
