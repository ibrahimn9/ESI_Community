import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Stack } from "@mui/material";
import { images } from "../constants";
import { BiCommentDetail } from "react-icons/bi";
import { BsCaretDown, BsCaretUp } from "react-icons/bs";
import { BsBookmark } from "react-icons/bs";
import { BiLoaderAlt } from "react-icons/bi";

import { useDispatch, useSelector } from "react-redux";
import { updatePost } from "../reducers/postReducer";
import { createUser } from "../reducers/userReducer";
import { userBadge } from "../constants/userBadge";

import postService from "../services/postService";
import userServices from "../services/userServices";
import adminServices from "../services/adminServices";

const AdminPost = ({ post, author }) => {
  const { title, user, tags, createdAt } = post;
  const [likes, setLikes] = useState();
  const [votedUp, setVotedUp] = useState(false);
  const [votedDown, setVotedDown] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingA, setIsLoadingA] = useState(false);
  const [mark, setMark] = useState(false);
  const [currUser, setCurrUser] = useState({});

  const daysAgo = Math.round(
    (new Date() - new Date(createdAt)) / (1000 * 60 * 60 * 24)
  );

  const loggedUser = JSON.parse(window.localStorage.getItem("loggedUser"));

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleDeletePost = async () => {
    setIsLoadingA(true);
    const { data } = await adminServices.deletePost({ id: post.id });
    if (data) setIsLoadingA(false);
  };

  const handleDeleteUser = async () => {
    setIsLoading(true);
    const { data } = await adminServices.deleteUser(
      { id: post.user, email: author.email },
      loggedUser.token
    );
    if (data) setIsLoading(false);
  };

  const handleProfileClick = () => {
    navigate(`/user_profile/${author.id}`);
  };

  const handlePostClick = () => {
    navigate(`/post_detail/${post.id}`);
  };

  return (
    <Box
      sx={{
        background: "#FFFFFF",
        height: "auto",
        borderRadius: 2,
        border: "1px solid #E8E8EA",
        boxShadow: "5px 5px  10px #E8E8EA",
        mt: 2,
        p: 2,
      }}
    >
      <Stack direction="row" sx={{ alignItems: "center" }}>
        <Box sx={{ position: "relative" }}>
          <img
            src={
              author?.pic
                ? `https://drive.google.com/uc?export=view&id=${author?.pic}`
                : images.defaultUserPic
            }
            style={{
              height: "50px",
              width: "50px",
              borderRadius: "50%",
              display: "inline",
              marginRight: "5px",
              border: "2px solid rgba(153, 169, 183, 0.7)",
              objectFit: "cover",
            }}
          />
          <img src={userBadge(author?.points)} className="badge" />
        </Box>
        <Stack direction="column" sx={{ justifyContent: "center" }}>
          <button
            className="profile-link post-link btn"
            onClick={handleProfileClick}
          >
            {author?.name}
          </button>
          <label className="post-link post-label">{daysAgo} days ago</label>
        </Stack>
      </Stack>
      <Stack
        direction="row"
        sx={{ alignItems: "center", ml: 7, mt: 4, flexWrap: "wrap" }}
      >
        {tags?.map((tag) => (
          <span className="tags post-tags" key={`${post.id}/${tag}`}>
            {tag}
          </span>
        ))}
      </Stack>
      <Box sx={{ ml: 7 }}>
        <h3 className="post-title" onClick={handlePostClick}>
          {title}
        </h3>
      </Box>
      <Stack direction="row" sx={{ justifyContent: "space-around" }}>
        <button
          className="btn delete-p delete-u"
          onClick={handleDeleteUser}
          style={{ display: "flex", alignItems: "center" }}
        >
          Delete User
          {isLoading && <BiLoaderAlt className="loading" />}
        </button>
        <button
          className="btn delete-p"
          onClick={handleDeletePost}
          style={{ display: "flex", alignItems: "center" }}
        >
          Delete Post
          {isLoadingA && <BiLoaderAlt className="loading" />}
        </button>
      </Stack>
    </Box>
  );
};

export default AdminPost;
