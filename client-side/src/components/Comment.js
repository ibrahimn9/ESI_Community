import { useEffect, useState } from "react";
import userServices from "../services/userServices";
import { images } from "../constants";
import { Box, Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Comment = ({ user, text }) => {
  const [userObj, setUserObj] = useState();
  const navigate = useNavigate();

  const getUser = async () => {
    const { data } = await userServices.getOne(user);
    setUserObj(data);
  };

  const handleProfileClick = () => {
    navigate(`/user_profile/${userObj?.id}`);
  };

  useEffect(() => {
    getUser();
  });

  return (
    <Stack
      direction="row"
      sx={{ width: "100%", justifyContent: "center", mt: 4 }}
    >
      <img
        src={
          userObj?.pic
            ? `https://drive.google.com/uc?export=view&id=${userObj?.pic}`
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
      <Box
        sx={{
          flexBasis: "78%",
          height: "auto",
          border: "1px solid #DEDEDE",
          borderRadius: 1,
          p: 1,
        }}
      >
        <button
          className="profile-link post-link btn"
          style={{ margin: "0" }}
          onClick={handleProfileClick}
        >
          {userObj?.name}
        </button>
        <p>{text}</p>
      </Box>
    </Stack>
  );
};

export default Comment;
