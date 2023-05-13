import { useState } from "react";
import { Paper } from "@mui/material";
import { TbSend } from "react-icons/tb";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { createUser } from "../reducers/userReducer";

const EmailBar = () => {
  const [email, setEmail] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const handleEmailChange = (e) => {
    const email = e.target.value;
    setEmail(email);
  };

  const handleButtonClick = () => {
    dispatch(createUser({ email }));
    navigate("/auth/signup");
  };

  return (
    <Paper
      component="form"
      onSubmit={handleSubmit}
      sx={{
        borderRadius: "3px",
        position: "relative",
        pl: 2,
        width: { md: "70%", lg: "85%" },
        mt: { md: 8, lg: 4 },
        display: { xs: "none", md: "flex" },
        justifyContent: "space-between",
        boxShadow: "0 0 10px rgba(0, 0, 0, 0.3)",
        backgroundColor: "#F0F0F0",
      }}
      className="email-bar"
    >
      <input
        className="email-bar-input"
        placeholder="Email adress"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <button
        className="primary-btn header-btn btn"
        onClick={handleButtonClick}
      >
        Sign up <TbSend />
      </button>
    </Paper>
  );
};

export default EmailBar;
