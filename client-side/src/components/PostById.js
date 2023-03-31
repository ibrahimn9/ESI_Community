import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Stack } from "@mui/material";
import { images } from "../constants";
import { BiCommentDetail } from "react-icons/bi";
import { BsCaretDown, BsCaretUp } from "react-icons/bs";
import { BsBookmark } from "react-icons/bs";
import postService from "../services/postService";
import userServices from "../services/userServices";

const Post = ({ postId }) => {
  const [post, setPost] = useState();
  const [userObj, setUserObj] = useState();
  const [loggedObj, setLoggedObj] = useState();
  const [likes, setLikes] = useState();
  const [votedUp, setVotedUp] = useState(false);
  const [votedDown, setVotedDown] = useState(false);
  const [updatedUser, setUpdatedUser] = useState();
  const [mark, setMark] = useState(false)
  const loggedUser = JSON.parse(window.localStorage.getItem("loggedUser"));
  const navigate = useNavigate();

  const getPostAndUser = async () => {
    const { data } = await postService.getOne(postId);
    const { user } = data;
    const res = await userServices.getOne(user);
    const response = await userServices.getOne(loggedUser.id);   
    setPost(data);
    setUserObj(res.data);
    setLikes(data.likes);
    if(response.data?.bookmarks.includes(postId)){
        setMark(true)
    }
  }

  useEffect(() => {
    getPostAndUser();
    }, [])    


  const handleUpClick = async () => {
    const { data } = await postService.updatePost({
      ...post,
      likes: post?.likes + 1,
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

  const handleMarkClick = async() => {
    if(!mark){
    const { data } = await userServices.sendMark(post.id, loggedUser.token);
    setMark(true);
    }
    else {
      const { data } = await userServices.sendUnmark(post.id, loggedUser.token);
      setMark(false);
    }    
  }


  const handleProfileClick = () => {
    navigate(`/user_profile/${userObj.id}`)
  };

  return (
    <Box
      sx={{
        background: "#FFFFFF",
        height: "auto",
        borderRadius: 2,
        border: "1px solid #DEDEDE",
        mt: 2,
        p: 2,
      }}
    >
      <Stack direction="row" sx={{ alignItems: "center" }}>
        <img
          src={
            userObj?.pic
              ? `https://drive.google.com/uc?export=view&id=${userObj?.pic}`
              : images.defaultUserPic
          }
          style={{
            height: "50px",
            width: "50px",
            borderRadius: "50%",
            display: "inline",
            marginRight: '5px',
            border: "1px solid #DEDEDE",
          }}
        />
        <Stack direction="column" sx={{ justifyContent: "center" }}>
          <button className="profile-link post-link btn" onClick={handleProfileClick}>
            {userObj?.name}
          </button>
          <label className="post-link post-label">Mars 10 2 days ago</label>
        </Stack>
      </Stack>
      <Box sx={{ ml: 7 }}>
        <h3 className="post-title">{post?.title}</h3>
      </Box>
      <Stack
        direction="row"
        sx={{ alignItems: "center", ml: 7, flexWrap: "wrap" }}
      >
        <span className="tags">#analyse</span>
        <span className="tags">#math</span>
        <span className="tags">#2cp</span>
        <span className="tags">#serie_numerique</span>
      </Stack>
      <Stack direction="row" sx={{ justifyContent: "space-between" }}>
        <Box>
          <Stack
            direction="column"
            sx={{ alignItems: "center", justifyContent: "center" }}
          >
            <button className="inter-btn" onClick={handleUpClick} disabled={votedUp}>
              <BsCaretUp style={{ marginBottom: "-10px" }} />
            </button>
            <span className="post-static">{likes}</span>
            <button className="inter-btn" onClick={handleDownClick} disabled={votedDown}>
              <BsCaretDown style={{ marginTop: "-15px" }} />
            </button>
          </Stack>
        </Box>
        <Stack direction="row" sx={{ alignItems: "center", ml: 1 }}>
          <button className="inter-btn">
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
        <button className={mark ? 'inter-btn marked': 'inter-btn'} onClick={handleMarkClick}>
          <BsBookmark style={{ fontSize: "24px" }} />
        </button>
      </Stack>
    </Box>
  );
};

export default Post;