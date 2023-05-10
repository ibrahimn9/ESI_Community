import { useEffect, useState } from "react";

import { Box, Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { NavBar } from "../containers/UserHome";
import { useSelector } from "react-redux";
import userServices from "../services/userServices";
import { images } from "../constants";
import { ChromePicker } from "react-color";
import createValidationMessage from "../constants/createValidationMessage";

import { Footer } from "../containers/Home";

const Settings = () => {
  const loggedUser = JSON.parse(window.localStorage.getItem("loggedUser"));
  const navigate = useNavigate()
  const [user, setUser] = useState({});
  const [toggle, setToggle] = useState(false);

  const [selectedColor, setSelectedColor] = useState("#000000");
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [file, setFile] = useState();
  const [currPassword, setCurrPassword] = useState("");
  const [password, setPassword] = useState("");

  const [errors, setErrors] = useState([]);
  const [error, setError] = useState();

  const [isPasswordValid, setIsPasswordValid] = useState(false);

  const handleProfileChanges = async () => {
    if (file) {
      file.append("name", name);
      file.append("bio", bio);
      file.append("brandColor", selectedColor);
      const { data } = await userServices.updateProfile(file, loggedUser.token);
    } else {
      const { data } = await userServices.updateProfile(
        {
          name,
          bio,
          brandColor: selectedColor,
        },
        loggedUser.token
      );
    }
  };

  const handlePasswordChange = async (event) => {
    const password = event.target.value;
    setPassword(password);
    try {
      const { data } = await userServices.verifyPassword({ password });
      const arrayOfErrors = createValidationMessage.passwordValidationMessage(
        data.errors
      );
      setIsPasswordValid(data.valid);
      setErrors(arrayOfErrors);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault()
  }

  const handlePasswordUpdate = async () => {
    setError('')
    const res = await userServices.updatePassword(
      { password, currPassword },
      loggedUser.token
    );
    if (res.data.error) {
      setError(res.data.error);
    }
  };

  const handleDelete = async () => {
    const { data } = await userServices.deleteUser(loggedUser.token)
    window.localStorage.clear()
    navigate('/auth/login');
  }

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("file", file);
    setFile(formData);
  };

  const getUser = async () => {
    const { data } = await userServices.getOne(loggedUser.id);
    setUser(data);
    setBio(data.bio);
    setName(data.name);
    setSelectedColor(data.brandColor);
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <Box sx={{ background: "#EDF1F2", height: "auto" }}>
      <NavBar />
      <Box
        sx={{
          display: "flex",
          width: "100%",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            background: "white",
            height: "auto",
            width: { xs: "60%", md: "40%" },
            mt: 2,
            mb: 4,
            boxShadow: "5px 5px  10px #E8E8EA",
            borderRadius: 4,
            display: "flex",
            flexDirection: "column",
            px: 8,
            py: 2,
            pb: 4,
          }}
        >
          <h1 style={{ color: "#3C87F0" }}>Profile</h1>
          <Box sx={{ display: "flex", flexDirection: "column", mb: 4 }}>
            <span style={{ color: "#04396A", marginBottom: "10px" }}>Name</span>
            <input
              type="text"
              className="input-tags"
              placeholder="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Box>
          <Box sx={{ display: "flex", flexDirection: "column", mb: 4 }}>
            <span style={{ color: "#04396A", marginBottom: "10px" }}>Bio</span>
            <textarea
              type="text"
              className="input-tags"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
            />
          </Box>
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <span style={{ color: "#04396A", marginBottom: "10px" }}>
              Profile image
            </span>
            <Box sx={{ display: "flex", alignItems: "center", mb: 4 }}>
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
              <input type="file" onChange={handleFileInputChange} />
            </Box>
          </Box>
          <Box sx={{ display: "flex", flexDirection: "column", mb: 4 }}>
            <span style={{ color: "#04396A", marginBottom: "10px" }}>
              Brand color
            </span>
            <Box
              className="input-tags"
              sx={{ display: "flex", alignItems: "center", width: "50%" }}
            >
              <Box
                sx={{
                  height: "35px",
                  width: "35px",
                  background: selectedColor,
                  borderRadius: "5px",
                  cursor: "pointer",
                  mr: 2,
                  position: "relative",
                }}
                onClick={() => setToggle(!toggle)}
              >
                {toggle && (
                  <Box style={{ position: "absolute", top: "120%" }}>
                    <ChromePicker
                      color={selectedColor}
                      onChange={(color) => setSelectedColor(color.hex)}
                    />
                  </Box>
                )}
              </Box>
              <span>{selectedColor}</span>
            </Box>
          </Box>
          <button
            className="btn post-btn"
            style={{ margin: 0 }}
            onClick={handleProfileChanges}
          >
            Save changes
          </button>
        </Box>
        <Box
          sx={{
            background: "white",
            height: "auto",
            width: { xs: "60%", md: "40%" },
            mt: 2,
            mb: 4,
            boxShadow: "5px 5px  10px #E8E8EA",
            borderRadius: 4,
            display: "flex",
            flexDirection: "column",
            px: 8,
            py: 2,
            pb: 4,
          }}
        >
          <h1 style={{ color: "#3C87F0" }}>Set new password</h1>
          <form onSubmit={handleSubmit}>
            <Box sx={{ display: "flex", flexDirection: "column", mb: 4 }}>
              <span style={{ color: "#04396A", marginBottom: "10px" }}>
                Current password
              </span>
              <input
                type="password"
                className="input-tags"
                onChange={(e) => setCurrPassword(e.target.value)}
              />
              {error && <span className="auth-msg">{error}</span>}
            </Box>
            <Box sx={{ display: "flex", flexDirection: "column", mb: 4 }}>
              <span style={{ color: "#04396A", marginBottom: "10px" }}>
                Password
              </span>
              <input
                type="password"
                className="input-tags"
                onChange={handlePasswordChange}
              />
              <div className="auth-msg">
                {password &&
                  !isPasswordValid &&
                  errors.map((error) => <div key={error}>{error}</div>)}
              </div>
            </Box>
            <button
              className="btn post-btn"
              style={{ margin: 0 }}
              disabled={!isPasswordValid || !currPassword}
              onClick={handlePasswordUpdate}
            >
              Set new password
            </button>
          </form>
        </Box>
        <Box
          sx={{
            background: "white",
            height: "auto",
            width: { xs: "60%", md: "40%" },
            mt: 2,
            mb: 4,
            boxShadow: "5px 5px  10px #E8E8EA",
            borderRadius: 4,
            display: "flex",
            flexDirection: "column",
            px: 8,
            py: 2,
            pb: 4,
          }}
        >
          <h1 style={{ color: "#dc2626", marginBottom: 0 }}>Danger Zone</h1>
          <h3 style={{ fontSize: "22px" }}>Delete account</h3>
          <span>
            Deleting your account will: Delete your profile, along with your
            authentication associations.
          </span>
          <span>
            Delete any and all content you have, such as articles, comments, or
            your reading list.
          </span>
          <button
            className="btn post-btn"
            style={{ margin: 0, background: "#dc2626", marginTop: "20px" }}
            onClick={handleDelete}
          >
            Delete Account
          </button>
        </Box>
      </Box>
      <Footer />
    </Box>
  );
};

export default Settings;