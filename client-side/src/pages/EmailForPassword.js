import React from "react";
import { useState } from "react";

import { images } from "../constants";
import { useNavigate } from "react-router-dom";
import { Stack, Box, Typography } from "@mui/material";
import userServices from "../services/userServices";
import { useSelector, useDispatch } from "react-redux";
import { createUser } from "../reducers/userReducer";

const EmailForPassword = () => {
  const [email, setEmail] = useState("");
  const dispatch = useDispatch();
  const [isEmailValid, setIsEmailValid] = useState(false);
  const navigate = useNavigate();
  const [toggle, setToggle] = useState(false);

  const handleEmailChange = async (event) => {
    const email = event.target.value;
    setEmail(email);

    try {
      const { data } = await userServices.verifyEmail(event.target.value);
      setIsEmailValid(data.exist);
    } catch (error) {
      console.log(error);
    }
  };

  const confirmClick = async () => {
    dispatch(createUser({ email }));
    const res = await userServices.sendEmailForPassword(email);
    setToggle(true);
  };

  const handleResendEmail = async() => {
    const res = await userServices.sendEmailForPassword(email);
  }

  if (toggle)
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          width: "100vw",
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
          <h1 style={{ color: "#3C87F0" }}>Check Your Email</h1>
          <h3 style={{ color: "#97a6b4" }}>
            Please check your email for instructions to reset your password.
          </h3>
          <button className="btn post-btn" style={{ margin: 0 }} onClick={handleResendEmail} >
            Resend email
          </button>
        </Box>
      </Box>
    );

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        width: "100vw",
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
        <h1 style={{ color: "#3C87F0" }}>Enter your email</h1>
        <Box sx={{ display: "flex", flexDirection: "column", mb: 4 }}>
          <span style={{ color: "#04396A", marginBottom: "10px" }}>Email</span>
          <input
            type="email"
            value={email}
            className="input-tags"
            onChange={handleEmailChange}
          />
        </Box>
        {email && !isEmailValid && (
          <div className="auth-msg" style={{ margin: 0, marginBottom: "10px" }}>
            Email doesn't exist
          </div>
        )}
        <button
          className="btn post-btn"
          style={{ margin: 0 }}
          disabled={!email || !isEmailValid}
          onClick={confirmClick}
        >
          Set new password
        </button>
      </Box>
    </Box>
  );
};

export default EmailForPassword;
