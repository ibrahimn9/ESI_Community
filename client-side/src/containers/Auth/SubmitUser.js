import { useState } from "react";
import { Box } from "@mui/material";
import { images } from "../../constants";
import { useSelector, useDispatch } from "react-redux";
import { createUser } from "../../reducers/userReducer";
import user from "../../services/user";
import { Link } from "react-router-dom";
import { MdDone } from "react-icons/md";
import { GoChevronDown } from "react-icons/go";

const SubmitUser = () => {
  const [classOption, setClassOption] = useState({});
  const [profilePicture, setProfilePicture] = useState();
  const [msg, setMsg] = useState("");
  const dispatch = useDispatch();
  const newUser = useSelector((state) => state);

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const handleLogin = async (e) => {
    const addNewUser = {
      ...newUser,
      class: classOption,
      pic: profilePicture,
    };
    if (!classOption || !profilePicture) {
      setMsg("Class or profile picture invalid");
    } else {
      await user.createNewUser(addNewUser);
      dispatch(createUser(addNewUser));
    }
  };

  const handleProfilePictureChange = (event) => {
    const file = event.target.files[0];
    const imageURL = URL.createObjectURL(file);
    setProfilePicture(imageURL);
  };

  return (
    <Box
      sx={{
        position: "relative",
        transform: "translateX(-50%)",
        left: "50%",
        width: { xs: "70%", md: "35%", lg: "30%" },
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        mt: 6,
      }}
    >
      <img src={images.logo} />
      <h2 style={{ color: "white" }}>You're almost done!</h2>
      <Box
        sx={{
          mt: "5px",
          px: 4,
          py: 2,
          borderRadius: "10px",
          border: "1px solid  #202637",
          background: "#1e1e1e",
          boxShadow: "0 0 10px #121212",
          width: "100%",
        }}
      >
        <form className="auth-form login-form" onSubmit={handleSubmit}>
          <label>What class are you in?</label>
          <div className="auth-option">
            <button onClick={() => setClassOption({ class: 1 })}>
              <span>1CP</span>
              {classOption.class === 1 && <MdDone />}
            </button>
            <button onClick={() => setClassOption({ class: 2 })}>
              <span>2CP</span>
              {classOption.class === 2 && <MdDone />}
            </button>
            <button onClick={() => setClassOption({ class: 3 })}>
              <span>1CS</span>
              {classOption.class === 3 && <MdDone />}
            </button>
            <button
              onClick={() => setClassOption({ class: 4 })}
              disabled={classOption.class === 4}
            >
              <span>2CS</span>
              <GoChevronDown />
              {classOption.class === 4 && (
                <div className="speciality-option">
                  <button
                    onClick={() =>
                      setClassOption({ class: 4, specialty: "SIW" })
                    }
                  >
                    <span>SIW</span>
                    {classOption.class === 4 &&
                      classOption.specialty === "SIW" && <MdDone />}
                  </button>
                  <button
                    onClick={() =>
                      setClassOption({ class: 4, specialty: "ISI" })
                    }
                  >
                    <span>ISI</span>
                    {classOption.class === 4 &&
                      classOption.specialty === "ISI" && <MdDone />}
                  </button>
                </div>
              )}
            </button>
            <button
              onClick={() => setClassOption({ class: 5 })}
              disabled={classOption.class === 5}
            >
              <span>3CS</span>
              <GoChevronDown />
              {classOption.class === 5 && (
                <div className="speciality-option">
                  <button
                    onClick={() =>
                      setClassOption({ class: 5, specialty: "SIW" })
                    }
                  >
                    <span>SIW</span>
                    {classOption.class === 5 &&
                      classOption.specialty === "SIW" && <MdDone />}
                  </button>
                  <button
                    onClick={() =>
                      setClassOption({ class: 5, specialty: "ISI" })
                    }
                  >
                    <span>ISI</span>
                    {classOption.class === 5 &&
                      classOption.specialty === "ISI" && <MdDone />}
                  </button>
                </div>
              )}
            </button>
          </div>
          <label>Please upload a profile picture.</label>
          <input
            type="file"
            onChange={handleProfilePictureChange}
            accept="image/*"
          />
          <button onClick={handleLogin} className="login-btn btn">
            Create account
          </button>
        </form>
      </Box>
          {msg && <div className="auth-msg">{msg}</div>}
    </Box>
  );
};

export default SubmitUser;
