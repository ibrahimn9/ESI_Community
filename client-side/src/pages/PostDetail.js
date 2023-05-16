import { Box, Stack } from "@mui/material";
import { NavBar } from "../containers/UserHome";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import postService from "../services/postService";
import userServices from "../services/userServices";
import adminServices from "../services/adminServices";

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
import { userBadge } from "../constants/userBadge";
import ReportedPost from "./ReportedPost";
import { MdOutlineReportProblem } from 'react-icons/md'

const PostDetail = () => {
  const { id } = useParams();

  const [post, setPost] = useState();
  const [likes, setLikes] = useState();
  const [user, setUser] = useState();
  const [currUser, setCurrUser] = useState();

  const [votedUp, setVotedUp] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);
  const [votedDown, setVotedDown] = useState(false);
  const [toggle, setToggle] = useState(false);
  const [reportToggle, setReportToggle] = useState(false);
  const [comment, setComment] = useState();
  const [comments, setComments] = useState([]);
  const [mark, setMark] = useState(false);
  const loggedUser = JSON.parse(window.localStorage.getItem("loggedUser"));
  const navigate = useNavigate();
  const commentsRef = useRef(null);

  const daysAgo = Math.round(
    (new Date() - new Date(post?.createdAt)) / (1000 * 60 * 60 * 24)
  );

  const handleCommentButtonClick = () => {
    commentsRef.current.scrollIntoView({ behavior: "smooth" });
  };

  const getPostAndUser = async () => {
    const { data } = await postService.getOne(id);
    const res = await userServices.getOne(data.user);
    const response = await userServices.getOne(loggedUser.id);
    setPost(data);
    setComments(data.comments);
    setUser(res.data);
    setLikes(data.likes);
    setCurrUser(response.data);
    if (response.data?.bookmarks.includes(id)) {
      setMark(true);
    }
    if (res.data?.folowers.includes(loggedUser.id)) {
      setIsFollowing(true);
    }

    if (data?.up.includes(loggedUser.id)) {
      setVotedUp(true);
      setVotedDown(false);
    }
    if (data?.down.includes(loggedUser.id)) {
      setVotedDown(true);
      setVotedUp(false);
    }
  };

  useEffect(() => {
    getPostAndUser();
    if (window.location.hash === "#comments") {
      commentsRef.current.scrollIntoView({ behavior: "smooth" });
    } else {
      window.scrollTo(0, 0);
    }
  }, []);

  const handleMarkClick = async () => {
    if (!mark) {
      setMark(true);
      const { data } = await userServices.sendMark(id, loggedUser.token);
      if (user.id !== currUser.id) {
        const { res } = await userServices.updateUser({
          ...user,
          points: user.points + 10,
        });
      }

      const notification = {
        postId: post?.id,
        text: `Your post <span className='b'>${post.title}</span> was bookmarked by another user!, you got <span className='b'>+10 XP</span> for that`,
      };
      const resp = await userServices.addNotification(
        notification,
        loggedUser.token,
        user.id
      );
    } else {
      setMark(false);
      const { data } = await userServices.sendUnmark(id, loggedUser.token);
      if (user.id !== currUser.id) {
        const { res } = await userServices.updateUser({
          ...user,
          points: user.points - 10,
        });
      }
    }
  };

  const handleUpClick = async () => {
    setLikes(post.likes + 1);
    setVotedUp(true);
    setVotedDown(false);
    const { data } = await postService.updatePost({
      ...post,
      likes: likes + 1,
      up: post.up.concat(loggedUser.id),
      down: post.down.filter((u) => u !== loggedUser.id),
    });
    const res = await userServices.updateUser({
      ...user,
      points: user.points + 3,
    });

    const notification = {
      postId: post?.id,
      text: `you received an upvote on your post <span className='b'>${post.title}</span>!, you got <span className='b'>+3 XP</span> for that`,
    };
    const resp = await userServices.addNotification(
      notification,
      loggedUser.token,
      user.id
    );
  };

  const handleDownClick = async () => {
    setLikes(post.likes - 1);
    setVotedDown(true);
    setVotedUp(false);
    const { data } = await postService.updatePost({
      ...post,
      likes: likes - 1,
      down: post.down.concat(loggedUser.id),
      up: post.up.filter((u) => u !== loggedUser.id),
    });

    const { res } = await userServices.updateUser({
      ...user,
      points: user.points - 3,
    });
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
    const newComment = {
      user: loggedUser.id,
      text: comment,
    };
    setComments(comments.concat(newComment));
    setToggle(false);
    setComment("");
    const { data } = await postService.addComment(post?.id, loggedUser.token, {
      comment,
    });
    const { res } = await userServices.updateUser({
      ...user,
      points: user.points + 1,
    });
    const { response } = await userServices.updateUser({
      ...currUser,
      points: currUser.points + 1,
    });
  };

  const handleReport = async () => {
    const { data } = await adminServices.sendReported({ post }, loggedUser.token);
  }

  return (
    <Box sx={{ background: "#EDF1F2", height: "auto" }}>
      <NavBar />
      <Stack
        direction="row"
        sx={{
          mx: { xs: 4, lg: 15 },
          positon: "relative",
          mb: 4,
          justifyContent: { xs: "center", md: "" },
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
            <button
              className="inter-btn"
              style={{ position: "relative" }}
              onClick={() => setReportToggle(!reportToggle)}
            >
              <FiMoreHorizontal />
              {reportToggle && <Box
                sx={{
                  top: '100%',
                  width: "200px",
                  height: "50px",
                  background: "white",
                  boxShadow: "0 0 10px rgba(0, 0, 0, 0.3)",
                  borderRadius: '5px',
                  position: "absolute",
                  display: 'flex',
                  alignItems: 'center',
                  px: 4,
                  zIndex: '1000',
                }}
                onClick={handleReport}
                >
                  <MdOutlineReportProblem />
                  <h3 className="tags">Report</h3>
                </Box>}
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
            border: "1px solid rgba(153, 169, 183, 0.7)",
            flexGrow: "1",
            height: "",
          }}
        >
          <Stack direction="row" sx={{ alignItems: "center" }}>
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
                  border: "2px solid rgba(153, 169, 183, 0.7)",
                  objectFit: "cover",
                }}
              />
              <img src={userBadge(user?.points)} className="badge" />
            </Box>
            <Stack direction="column" sx={{ justifyContent: "center" }}>
              <button
                className="profile-link post-link btn"
                onClick={handleProfileClick}
              >
                {user?.name}
              </button>
              <label className="post-link post-label">{daysAgo} days ago</label>
            </Stack>
          </Stack>
          <h1 style={{ fontWeight: "900", fontSize: "52px", color: "#04396A" }}>
            {post?.title}
          </h1>
          <Stack
            direction="row"
            sx={{ alignItems: "center", flexWrap: "wrap" }}
          >
            {post?.tags?.map((tag) => (
              <span className="tags post-tags" key={`${post.id}/${tag}`}>
                {tag}
              </span>
            ))}
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
            ref={commentsRef}
          >
            <Box sx={{ width: "100%" }}>
              <h1 style={{ color: "#04396a" }}>Comments</h1>
              <Stack
                direction="row"
                sx={{ width: "100%", justifyContent: "center" }}
              >
                <img
                  src={
                    currUser?.pic
                      ? `https://drive.google.com/uc?export=view&id=${currUser?.pic}`
                      : images.defaultUserPic
                  }
                  style={{
                    height: "45px",
                    width: "45px",
                    borderRadius: "50%",
                    display: "inline",
                    marginRight: "5px",
                    border: "2px solid rgba(153, 169, 183, 0.7)",
                  }}
                />
                <textarea
                  className="cmnt"
                  placeholder="Add to the discussion"
                  value={comment}
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
              {comments?.map((comment) => (
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
            border: "1px solid rgba(153, 169, 183, 0.7)",
            display: { xs: "none", md: "flex" },
            flexDirection: "column",
            alignItems: "center",
            height: "",
          }}
        >
          <Stack direction="row" sx={{ alignItems: "center" }}>
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
                  border: "p2x solid rgba(153, 169, 183, 0.7)",
                }}
              />
              <img src={userBadge(user?.points)} className="badge" />
            </Box>
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
              borderTop: "1px solid rgba(153, 169, 183, 0.7)",
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
