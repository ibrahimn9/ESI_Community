import { useEffect, useState } from "react";

import { Box, Stack } from "@mui/material";
import { images } from "../../constants";
import { useNavigate, Link } from "react-router-dom";

import { FiSearch } from "react-icons/fi";
import { RiNotification3Line } from "react-icons/ri";
import { FiMenu } from "react-icons/fi";

import { SearchBar } from "../../components";
import userServices from "../../services/userServices";
import { userBadge } from "../../constants/userBadge";

import { toggleCategory } from "../../constants/categories";

import XsMenu from "./XsMenu";
import { useRef } from "react";

const NavBar = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState();
  const [toggle, setToggle] = useState(false);
  const [notificationToggle, setNotificationToggle] = useState(false);
  const [bubbleToggle, setBubbleToggle] = useState(false);
  const [moveX, setMoveX] = useState();
  const loggedUser = JSON.parse(window.localStorage.getItem("loggedUser"));

  const profileMenuRef = useRef(null);
  const notificationRef = useRef();

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        (profileMenuRef.current &&
          !profileMenuRef.current.contains(event.target)) ||
        (notificationRef.current &&
          !notificationRef.current.contains(event.target))
      ) {
        setToggle(false);
        setNotificationToggle(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [profileMenuRef, notificationRef]);

  const getUser = async () => {
    const { data } = await userServices.getOne(loggedUser.id);
    setUser(data);
    if(data.notifications.length > 0) setBubbleToggle(true)
  };

  useEffect(() => {
    getUser();
  }, []);

  const handleCreatePostClick = () => {
    navigate("/user_home/create_post");
  };

  const handleNotiClick = async () => {
    if (user?.notifications.length > 0) {
      setNotificationToggle(!notificationToggle);
      setBubbleToggle(false)
      const resp = await userServices.deleteNotifications(loggedUser.token);
    }
  };

  const handleProfileClick = () => {
    navigate(`/user_profile/${loggedUser.id}`);
  };

  const handleLogout = () => {
    window.localStorage.clear();
    navigate("/auth/login");
  };

  const handleSettingsClick = () => {
    navigate("/settings");
  };

  return (
    <Stack
      direction="row"
      px={{ xs: 4, lg: 15 }}
      sx={{
        top: "0",
        background: "#FDFDFD",
        justifyContent: "space-between",
        boxShadow: "0 2px 4px #e3e3e3",
        alignItems: "center",
        py: 1,
        zIndex: 10,
        position: "sticky",
      }}
    >
      <XsMenu moveX={moveX} setMoveX={setMoveX} />
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <button
          className="nos-btn menu-btn btn"
          onClick={() => setMoveX("-50px")}
        >
          <FiMenu />
        </button>
        <Link to={`/user_home/${loggedUser.id}`}>
          <img
            src={images.logo}
            alt="logo"
            style={{ width: "100px", marginRight: "50px" }}
          />
        </Link>
        <SearchBar />
      </Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-around",
        }}
      >
        <button
          className="navtxt-btn nav-btn btn"
          onClick={handleCreatePostClick}
        >
          Create Post
        </button>
        <Box sx={{ position: "relative" }}>
          <button className="nos-btn btn" onClick={handleNotiClick}>
            <RiNotification3Line />
            {bubbleToggle && (
              <Box
                sx={{
                  width: "10px",
                  height: "10px",
                  borderRadius: "50%",
                  top: 0,
                  right: "5px",
                  background: "red",
                  position: "absolute",
                }}
              />
            )}
          </button>
          {notificationToggle && (
            <Box
              sx={{
                position: "absolute",
                bottom: "",
                right: "-10px",
                zIndex: "10",
                border: "1px solid #E8E8EA",
                boxShadow: "0 5px 10px #97a6b4",
                borderRadius: "5px",
                background: "white",
                py: 1,
                px: 4,
                width: { xs: "200px", md: "300px" },
              }}
              ref={notificationRef}
            >
              <Box sx={{ mt: 3 }}>
                {user?.notifications.map((noti) => (
                  <Box
                    sx={{
                      mb: 3,
                      pb: 3,
                      borderBottom: "2px solid #E8E8EA",
                    }}
                    className="cat"
                    key={noti.text}
                  >
                    <h4 style={{ margin: "0", marginBottom: "5px" }}>
                      <div
                        dangerouslySetInnerHTML={{ __html: noti.text }}
                        className="b"
                      ></div>
                    </h4>
                  </Box>
                ))}
              </Box>
            </Box>
          )}
        </Box>
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
              border: "3px solid #97A6B4",
              borderRadius: "50%",
              marginLeft: "15px",
              cursor: "pointer",
            }}
            onClick={() => setToggle(!toggle)}
          />
          <img src={userBadge(user?.points)} className="badge badge--nv" />
          <Box
            sx={{
              position: "absolute",
              bottom: "",
              right: "-10px",
              zIndex: "10",
              border: "1px solid #E8E8EA",
              boxShadow: "0 5px 10px #97a6b4",
              borderRadius: "5px",
              background: "white",
              py: 1,
              px: 4,
              flexDirection: "column",
              alignItems: "center",
            }}
            display={toggle ? "flex" : "none"}
            ref={profileMenuRef}
          >
            <Box sx={{ mt: 3 }}>
              {toggleCategory.map((cat) => (
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    mb: 3,
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    if (cat.name === "Profile") {
                      handleProfileClick();
                    } else if (cat.name === "Logout") {
                      handleLogout();
                    } else if (cat.name === "Settings") {
                      handleSettingsClick();
                    }
                  }}
                  className="cat toggle-cat"
                  key={cat.name}
                >
                  <span>{cat.icon}</span>
                  <h4 style={{ margin: "0", marginBottom: "5px" }}>
                    {cat.name}
                  </h4>
                </Box>
              ))}
            </Box>
          </Box>
        </Box>
      </Box>
    </Stack>
  );
};

export default NavBar;
