import { useState } from "react";
import { Box } from "@mui/material";
import { images } from "../../constants";
import { useSelector, useDispatch } from "react-redux";
import { createUser } from "../../reducers/userReducer";
import userServices from "../../services/userServices";
import { useNavigate } from "react-router-dom";
import { MdDone } from "react-icons/md";
import { GoChevronDown } from "react-icons/go";
import { BiLoaderAlt } from "react-icons/bi";

const SubmitUser = () => {
  const [classOption, setClassOption] = useState({});
  const [file, setFile] = useState();
  const [msg, setMsg] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const newUser = useSelector((state) => state.user);

  console.log(newUser)

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const handleLogin = async (e) => {
    setIsLoading(true);
    const { name, password, email } = newUser;
    file.append("class", classOption);
    file.append("name", name);
    file.append("password", password);
    file.append("email", email);
      const { data } = await userServices.createNewUser(file);
      dispatch(createUser(data));
      const { id } = data;
      const res = await userServices.login({ email, password });
      if (data) setIsLoading(false);
      window.localStorage.setItem("loggedUser", JSON.stringify(data));
      navigate(`/user_home/${id}`);
  };

  const handleProfilePictureChange = (event) => {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append("file", file);
    setFile(formData);
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
      <img src={images.logo} height={80} />
      <h2 style={{ color: "#F2AB44" }}>You're almost done!</h2>
      <Box
        sx={{
          mt: "5px",
          px: 4,
          py: 2,
          borderRadius: "10px",
          background: "#F0F0F0",
          boxShadow: "0 0 10px rgba(0, 0, 0, 0.3)",
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
          <button
            onClick={handleLogin}
            className="login-btn btn"
            disabled={!file || !classOption}
            style={{ display: "flex", alignItems: "center", justifyContent: 'center' }}
          >
            Create account
            {isLoading && <BiLoaderAlt className="loading" />}
          </button>
        </form>
      </Box>
      {msg && <div className="auth-msg">{msg}</div>}
    </Box>
  );
};

export default SubmitUser;
