import { Box, Stack } from "@mui/material";
import { NavBar } from "../containers/UserHome";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import postService from "../services/postService";
import userServices from "../services/userServices";
import { BiCommentDetail } from "react-icons/bi";
import { BsCaretDown, BsCaretUp, BsFileEarmarkTextFill } from "react-icons/bs";
import { BsBookmark } from "react-icons/bs";
import { FiMoreHorizontal } from "react-icons/fi";
import { FaSchool } from "react-icons/fa";
import { images } from "../constants";
import { useNavigate } from "react-router-dom";
import { useRef } from "react";
import Footer from "../containers/Home/Footer";
import { Comment } from "../components";

const PostDetail = () => {
  const { id } = useParams();
  const [post, setPost] = useState();
  const [likes, setLikes] = useState();
  const [user, setUser] = useState();
  const [votedUp, setVotedUp] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);
  const [votedDown, setVotedDown] = useState(false);
  const [toggle, setToggle] = useState(false);
  const [comment, setComment] = useState();
  const [mark, setMark] = useState(false);
  const loggedUser = JSON.parse(window.localStorage.getItem("loggedUser"));
  const navigate = useNavigate();
  const commentsRef = useRef(null);

  const handleCommentButtonClick = () => {
    commentsRef.current.scrollIntoView({ behavior: "smooth" });
  };

  const getPostAndUser = async () => {
    const { data } = await postService.getOne(id);
    const res = await userServices.getOne(data.user);
    const response = await userServices.getOne(loggedUser.id);
    setPost(data);
    setUser(res.data);
    setLikes(data.likes);
    if (response.data?.bookmarks.includes(id)) {
      setMark(true);
    }
    if (res.data?.folowing.includes(loggedUser.id)) {
      setIsFollowing(true);
    }
  };

  useEffect(() => {
    getPostAndUser();
  }, []);

  const handleMarkClick = async () => {
    if (!mark) {
      const { data } = await userServices.sendMark(id, loggedUser.token);
      setMark(true);
    } else {
      const { data } = await userServices.sendUnmark(id, loggedUser.token);
      setMark(false);
    }
  };

  const handleUpClick = async () => {
    const { data } = await postService.updatePost({
      ...post,
      likes: likes + 1,
    });
    setLikes(data.likes);
    setVotedUp(true);
    setVotedDown(false);
  };

  const handleDownClick = async () => {
    const { data } = await postService.updatePost({
      ...post,
      likes: likes - 1,
    });
    setLikes(data.likes);
    setVotedDown(true);
    setVotedUp(false);
  };

  const handleProfileClick = () => {
    navigate(`/user_profile/${user.id}`);
  };

  const handleFollow = async () => {
    const { data } = await userServices.sendFollow(
      post?.user,
      loggedUser.token
    );
    setIsFollowing(true);
  };

  const handleUnfollow = async () => {
    const { data } = await userServices.sendUnfollow(
      post?.user,
      loggedUser.token
    );
    setIsFollowing(false);
  };

  const handleCommentChange = (e) => {
    const comment = e.target.value;
    setComment(comment);
  };

  const handleAddComment = async () => {
    const { data } = await postService.addComment(post?.id, loggedUser.token, {
      comment,
    });
    setToggle(false);
    setComment("");
  };

  return (
    <Box sx={{ background: "#F5F5F5", height: "auto" }}>
      <NavBar />
      <Stack
        direction="row"
        sx={{
          mx: { xs: 4, lg: 15 },
          positon: "relative",
          mb: 4,
        }}
      >
        <Box
          sx={{ flexBasis: "6%", mt: 8, display: { xs: "none", sm: "block" } }}
        >
          <Stack
            direction="column"
            sx={{
              alignItems: "center",
              justifyContent: "space-around",
              height: "400px",
            }}
          >
            <Stack
              direction="column"
              sx={{ alignItems: "center", justifyContent: "center" }}
            >
              <button
                className="inter-btn"
                onClick={handleUpClick}
                disabled={votedUp}
              >
                <BsCaretUp style={{ marginBottom: "-10px" }} />
              </button>
              <span className="post-static">{likes}</span>
              <button
                className="inter-btn"
                onClick={handleDownClick}
                disabled={votedDown}
              >
                <BsCaretDown style={{ marginTop: "-15px" }} />
              </button>
            </Stack>
            <Stack direction="column" sx={{ alignItems: "center" }}>
              <button className="inter-btn">
                <BiCommentDetail
                  style={{
                    display: "flex",
                    alignItems: "center",
                    fontSize: "26px",
                  }}
                  onClick={handleCommentButtonClick}
                />
              </button>
              <span className="post-static">{post?.comments.length}</span>
            </Stack>
            <button
              className={mark ? "inter-btn marked" : "inter-btn"}
              onClick={handleMarkClick}
            >
              <BsBookmark style={{ fontSize: "24px" }} />
            </button>
            <button className="inter-btn">
              <FiMoreHorizontal />
            </button>
          </Stack>
        </Box>
        <Box
          sx={{
            background: "#FFFFFF",
            flexBasis: "65%",
            mt: 4,
            borderRadius: 2,
            p: 4,
            border: "1px solid #DEDEDE",
            flexGrow: "1",
            height: "",
          }}
        >
          <Stack direction="row" sx={{ alignItems: "center" }}>
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
                border: "1px solid #DEDEDE",
              }}
            />
            <Stack direction="column" sx={{ justifyContent: "center" }}>
              <button
                className="profile-link post-link btn"
                onClick={handleProfileClick}
              >
                {user?.name}
              </button>
              <label className="post-link post-label">Mars 10 2 days ago</label>
            </Stack>
          </Stack>
          <h1 style={{ fontWeight: "900", fontSize: "52px" }}>{post?.title}</h1>
          <Stack
            direction="row"
            sx={{ alignItems: "center", flexWrap: "wrap" }}
          >
            <span className="tags">#analyse</span>
            <span className="tags">#math</span>
            <span className="tags">#2cp</span>
            <span className="tags">#serie_numerique</span>
          </Stack>
          <p style={{ color: "#3f3f3f", fontSize: "22px" }}>
            {post?.description}
          </p>
          <button
            className="inter-btn btn"
            style={{
              fontWeight: "600",
              padding: "12px 24px",
              border: "2px solid #3f3f3f",
              borderRadius: "5px",
            }}
          >
            <a
              style={{ display: "flex", alignItems: "center" }}
              href={`${post?.url}`}
              target="_blank"
            >
              <BsFileEarmarkTextFill />
              Open file
            </a>
          </button>
          <Box
            sx={{
              height: "auto",
              borderTop: "1px solid #DEDEDE",
              width: "100%",
              mt: 6,
              pt: 6,
            }}
          >
            <Box sx={{ width: "100%" }} ref={commentsRef}>
              <h1>Comments</h1>
              <Stack
                direction="row"
                sx={{ width: "100%", justifyContent: "center" }}
              >
                <img
                  src={
                    user?.pic
                      ? `https://drive.google.com/uc?export=view&id=${user?.pic}`
                      : images.defaultUserPic
                  }
                  style={{
                    height: "45px",
                    width: "45px",
                    borderRadius: "50%",
                    display: "inline",
                    marginRight: "5px",
                    border: "1px solid #DEDEDE",
                  }}
                />
                <textarea
                  className="cmnt"
                  placeholder="Add to the discussion"
                  onFocus={() => setToggle(true)}
                  onChange={handleCommentChange}
                />
              </Stack>
              {toggle && (
                <button
                  className="post-btn btn"
                  style={{ margin: "10px 12%" }}
                  onClick={handleAddComment}
                  disabled={!comment}
                >
                  Submit
                </button>
              )}
              {post?.comments.map((comment) => (
                <Comment
                  key={`${comment.user}/${comment.text}`}
                  user={comment.user}
                  text={comment.text}
                />
              ))}
            </Box>
          </Box>
        </Box>
        <Box
          sx={{
            flexBasis: "26%",
            ml: 2,
            background: "#FFFFFF",
            mt: 4,
            borderRadius: 2,
            p: 2,
            border: "1px solid #DEDEDE",
            display: { xs: "none", md: "flex" },
            flexDirection: "column",
            alignItems: "center",
            height: "",
          }}
        >
          <Stack direction="row" sx={{ alignItems: "center" }}>
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
                border: "1px solid #DEDEDE",
              }}
            />
            <Stack direction="column" sx={{ justifyContent: "center" }}>
              <button
                className="profile-link post-link btn"
                onClick={handleProfileClick}
              >
                {user?.name}
              </button>
              <label
                className="tags"
                style={{
                  fontSize: "20px",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <FaSchool style={{ fontSize: "26px", marginRight: "10px" }} />
                ESI SBA
              </label>
            </Stack>
          </Stack>
          {loggedUser.id !== post?.user && !isFollowing && (
            <button
              style={{
                width: "80%",
                margin: "0",
                marginTop: "15px",
              }}
              onClick={handleFollow}
              className="post-btn btn"
            >
              Follow
            </button>
          )}
          {loggedUser.id === post?.user && (
            <button
              style={{
                width: "80%",
                margin: "0",
                marginTop: "15px",
              }}
              className="post-btn btn"
            >
              Edit profile
            </button>
          )}
          {isFollowing && (
            <button
              style={{
                width: "80%",
                marginTop: "15px",
              }}
              onClick={handleUnfollow}
              className="txt-btn btn"
            >
              Following
            </button>
          )}
          <p style={{ textAlign: "center" }}>
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
              mt: 1,
              p: 2,
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
      </Stack>
      <Footer />
    </Box>
  );
};

export default PostDetail;
