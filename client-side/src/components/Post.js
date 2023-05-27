import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Stack } from "@mui/material";
import { images } from "../constants";
import { BiCommentDetail } from "react-icons/bi";
import { BsCaretDown, BsCaretUp } from "react-icons/bs";
import { BsBookmark } from "react-icons/bs";

import { useDispatch, useSelector } from "react-redux";
import { updatePost } from "../reducers/postReducer";
import { createUser } from "../reducers/userReducer";
import { userBadge } from "../constants/userBadge";

import postService from "../services/postService";
import userServices from "../services/userServices";

const Post = ({ post, author }) => {
  const { title, user, tags, createdAt } = post;
  const [likes, setLikes] = useState();
  const [votedUp, setVotedUp] = useState(false);
  const [votedDown, setVotedDown] = useState(false);
  const [mark, setMark] = useState(false);
  const [currUser, setCurrUser] = useState({});

  const daysAgo = Math.round(
    (new Date() - new Date(createdAt)) / (1000 * 60 * 60 * 24)
  );

  const loggedUser = JSON.parse(window.localStorage.getItem("loggedUser"));


  const navigate = useNavigate();
  const dispatch = useDispatch();

  const isUpOrDown = () => {
    if (post.up.includes(loggedUser.id)) {
      setVotedUp(true);
      setVotedDown(false);
    }
    if (post.down.includes(loggedUser.id)) {
      setVotedDown(true);
      setVotedUp(false);
    }
  };

  const isMarked = async () => {
    const { data } = await userServices.getOne(loggedUser.id);
    setCurrUser(data);
    if (data.bookmarks.includes(post.id)) {
      setMark(true);
    }
  };

  const handleUpClick = async () => {
    setVotedUp(true);
    setVotedDown(false);
    setLikes(post.likes + 1);
    const updatedPost = {
      ...post,
      likes: likes + 1,
      up: post.up.concat(loggedUser.id),
      down: post.down.filter((u) => u !== loggedUser.id),
    };

    dispatch(updatePost(updatedPost));

    const { data } = await postService.updatePost(updatedPost);

    const res = await userServices.updateUser({
      ...author,
      points: author.points + 3,
    });
    const notification = {
      postId: post.id,
      text: `you received an upvote on your post <span className='b'>${post.title}</span>!, you got <span className='b'>+3 XP</span> for that`,
    };
    const resp = await userServices.addNotification(
      notification,
      loggedUser.token,
      author.id
    );
     


    if (post.likes + 1 === 30 && !post.inserted) {
      const path = {
        classInput: post.path.year,
        fileUrl: post.url,
        semestere: post.path.semester,
        type: post.path.folder,
        module: post.path.module,
      };

      const response = await postService.insertToDataBase(path);
      const res = await postService.updatePost({
        ...data,
        inserted: true,
      });
    }
  };

  const handleDownClick = async () => {
    setVotedDown(true);
    setVotedUp(false);
    setLikes(post.likes - 1);
    const updatedPost = {
      ...post,
      likes: likes - 1,
      down: post.down.concat(loggedUser.id),
      up: post.up.filter((u) => u !== loggedUser.id),
    };

    dispatch(updatePost(updatedPost));

    const { data } = await postService.updatePost(updatedPost);

    const res = await userServices.updateUser({
      ...author,
      points: author.points - 3,
    });
  };

  const handleMarkClick = async () => {
    if (!mark) {
      setMark(true);
      const updatedUser = {
        ...currUser,
        bookmarks: currUser.bookmarks?.concat(post.id),
      };

      setCurrUser(updatedUser);
      const response = await userServices.updateUser(updatedUser);
      if (author.id !== currUser.id) {
        const  res  = await userServices.updateUser({
          ...author,
          points: author.points + 10,
        });
      }
      const notification = {
        postId: post.id,
        text: `Your post <span className='b'>${post.title}</span> was bookmarked by another user!, you got <span className='b'>+10 XP</span> for that`,
      };
      const resp = await userServices.addNotification(
        notification,
        loggedUser.token,
        author.id
      );
    } else {
      setMark(false);
      const updatedUser = {
        ...currUser,
        bookmarks: currUser.bookmarks?.filter((p) => p !== post.id),
      };

      dispatch(createUser(updatedUser));
      const { response } = await userServices.updateUser(updatedUser);
      if (author.id !== currUser.id) {
        const { res } = await userServices.updateUser({
          ...author,
          points: author.points - 10,
        });
      }
    }
  };

  const handleProfileClick = () => {
    navigate(`/user_profile/${author.id}`);
  };

  const handlePostClick = () => {
    navigate(`/post_detail/${post.id}`);
  };

  const handleCommentClick = () => {
    navigate(`/post_detail/${post.id}#comments`);
  };

  useEffect(() => {
    setLikes(post.likes);
    isUpOrDown();
    isMarked();
  }, []);

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
      <Stack direction="row" sx={{ justifyContent: "space-between" }}>
        <Box>
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
        </Box>
        <Stack direction="row" sx={{ alignItems: "center", ml: 1 }}>
          <button className="inter-btn" onClick={handleCommentClick}>
            <BiCommentDetail
              style={{
                display: "flex",
                alignItems: "center",
                fontSize: "26px",
              }}
            />
          </button>
          <span className="tags">add comment</span>
        </Stack>
        <button
          className={mark ? "inter-btn marked" : "inter-btn"}
          onClick={handleMarkClick}
        >
          <BsBookmark style={{ fontSize: "24px" }} />
        </button>
      </Stack>
    </Box>
  );
};

export default Post;
