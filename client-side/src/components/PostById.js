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
    if(post.up.includes(response?.data.id)) {
      setVotedUp(true);
      setVotedDown(false);
    }
    if(post.down.includes(response?.data.id)) {
      setVotedDown(true);
      setVotedUp(false);
    }   
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
    setVotedUp(true);
    setVotedDown(false);
    const { data } = await postService.updatePost({
      ...post,
      likes: post?.likes + 1,
    });
    setLikes(data.likes);
    const { response } = await postService.addUp(post.id, loggedUser.token);
  };

  const handleDownClick = async () => {
    setVotedDown(true);
    setVotedUp(false);
    const { data } = await postService.updatePost({
      ...post,
      likes: likes - 1,
    });
    setLikes(data.likes);
    const { reponse } = await postService.addDown(post.id, loggedUser.token);
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

  const handlePostClick = () => {
    navigate(`/post_detail/${post.id}`)
  }

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
            border: "2px solid rgba(153, 169, 183, 0.7)",
            objectFit: 'cover',
          }}
        />
        <Stack direction="column" sx={{ justifyContent: "center" }}>
          <button className="profile-link post-link btn" onClick={handleProfileClick}>
            {userObj?.name}
          </button>
          <label className="post-link post-label">Mars 10 2 days ago</label>
        </Stack>
      </Stack>
      <Stack
        direction="row"
        sx={{ alignItems: "center", ml: 7, mt: 4, flexWrap: "wrap" }}
      >
        <span className="tags post-tags">#analyse</span>
        <span className="tags post-tags">#math</span>
        <span className="tags post-tags">#2cp</span>
        <span className="tags post-tags">#serie_numerique</span>
      </Stack>
      <Box sx={{ ml: 7 }}>
        <h3 className="post-title" onClick={handlePostClick}>{post?.title}</h3>
      </Box>
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