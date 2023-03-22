import { Box, Stack } from "@mui/material";
import { NavBar } from "../containers/UserHome";
import { images } from "../constants";
import { useNavigate, useParams } from "react-router-dom";
import { fontWeight } from "@mui/system";
import { MdEmail } from "react-icons/md";
import { FaSchool } from "react-icons/fa";
import { IoMdSchool } from "react-icons/io";

import userServices from "../services/userServices";
import postService from "../services/postService";

import { Footer } from "../containers/Home";

import { useEffect, useState } from "react";
import { Post, PostById } from "../components";

const UserProfile = () => {
  const [user, setUser] = useState();
  const [posts, setPosts] = useState([]);
  const [isFollowing, setIsFollowing] = useState(false);
  const [selectPost, setSelectPost] = useState(true);
  const { id } = useParams();
  const loggedUser = JSON.parse(window.localStorage.getItem("loggedUser"));
  const loggedId = loggedUser.id;

  const getUser = async () => {
    const { data } = await userServices.getOne(id);
    setUser(data);
    if (data.folowers.includes(loggedId)) {
      setIsFollowing(true);
    }
  };

  const handleFollow = async () => {
    const { data } = await userServices.sendFollow(id, loggedUser.token);
    setIsFollowing(true);
  };

  const handleUnfollow = async () => {
    const { data } = await userServices.sendUnfollow(id, loggedUser.token);
    setIsFollowing(false);
  };

  useEffect(() => {
    getUser();
  }, []);

  useEffect(() => {
    postService.getAll().then((posts) => setPosts(posts));
  }, []);

  return (
    <Box sx={{ background: "#F5F5F5", height: "auto" }}>
      <NavBar />
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          alignItems: "center",
          mb: 4,
        }}
      >
        <Box sx={{ background: "#000000", height: "140px", width: "100%" }} />
        <Box
          sx={{
            background: "#FFFFFF",
            height: "auto",
            borderRadius: 2,
            border: "1px solid #DEDEDE",
            width: { xs: "95%", md: "60%" },
            mt: -8,
            position: "relative",
            py: 2,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <img
            src={
              user?.pic
                ? `https://drive.google.com/uc?export=view&id=${user?.pic}`
                : images.defaultUserPic
            }
            className="profile-pic"
          />
          {loggedId !== id && !isFollowing && (
            <button
              style={{
                position: "absolute",
                right: "5%",
                margin: 0,
              }}
              onClick={handleFollow}
              className="post-btn btn"
            >
              Follow
            </button>
          )}
          {loggedId === id && (
            <button
              style={{
                position: "absolute",
                right: "5%",
                margin: 0,
              }}
              className="post-btn btn"
            >
              Edit profile
            </button>
          )}
          {isFollowing && (
            <button
              style={{
                position: "absolute",
                right: "5%",
                margin: 0,
              }}
              onClick={handleUnfollow}
              className="txt-btn btn"
            >
              Following
            </button>
          )}
          <h1
            style={{
              fontWeight: "900",
            }}
            className="mt"
          >
            {user?.name}
          </h1>
          <p style={{ textAlign: "center", margin: "0 30px" }}>
            Hi, I'm Ibra! I'm a front-end developer and student at computer
            science school ESI ex INI, and the main languages in my tech stack
            are JavaScript, React, and HTML/CSS. I’m a lifelong learner.
          </p>
          <Stack
            direction="row"
            sx={{
              justifyContent: "center",
              alignItems: "center",
              flexWrap: "wrap",
              mt: 4,
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", ml: 2, mr: 2 }}>
              <FaSchool
                style={{
                  color: "#717171",
                  fontSize: "30px",
                }}
              />
              <span className="tags">ESI SBA</span>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", mr: 2 }}>
              <IoMdSchool
                style={{
                  color: "#717171",
                  fontSize: "30px",
                }}
              />
              {user?.class.class > 2 ? (
                <span className="tags">{user?.class.class}CS</span>
              ) : (
                <span className="tags">{user?.class.class}CP</span>
              )}
            </Box>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <MdEmail
                style={{
                  color: "#717171",
                  fontSize: "30px",
                }}
              />
              <span className="tags">{user?.email}</span>
            </Box>
          </Stack>
          <Stack
            direction="row"
            sx={{
              justifyContent: "center",
              alignItems: "center",
              flexWrap: "wrap",
              mt: 4,
              pt: 4,
              pb: 2,
              borderTop: "1px solid #DEDEDE",
              width: "100%",
            }}
          >
            <Box sx={{ mr: 2 }}>
              <span>{user?.folowers.length}</span>
              <span className="tags">followers</span>
            </Box>
            <Box sx={{ mr: 2 }}>
              <span>{user?.posts.length}</span>
              <span className="tags">posts published</span>
            </Box>
            <Box sx={{ mr: 2 }}>
              <span>{user?.points}</span>
              <span className="tags">XP</span>
            </Box>
          </Stack>
        </Box>
        <Box sx={{ width: { xs: "95%", md: "60%" }, mt: 8 }}>
          <Stack
            direction="row"
            sx={{
              justifyContent: "space-around",
              alignItems: "center",
              pb: 1,
              borderBottom: "1px solid #DEDEDE",
            }}
          >
            <button
              className={
                selectPost ? "switch-btn btn selected" : "switch-btn btn"
              }
              onClick={() => setSelectPost(true)}
            >
              Posts
            </button>
            <button
              className={
                !selectPost ? "switch-btn btn selected" : "switch-btn btn"
              }
              onClick={() => setSelectPost(false)}
            >
              Favorite
            </button>
          </Stack>
          {selectPost &&
            posts
              ?.filter((post) => post.user === user?.id)
              .map((post) => <Post key={post.id} post={post} />)}
          {!selectPost &&
            user?.bookmarks.map((postId) => (
              <PostById key={postId} postId={postId} />
            ))}
        </Box>
      </Box>
      <Footer />
    </Box>
  );
};

export default UserProfile;
