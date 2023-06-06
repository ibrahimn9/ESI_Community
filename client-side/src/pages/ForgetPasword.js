import React from "react";
import { useState, useEffect } from "react";

import { images } from "../constants";
import { useNavigate, useParams } from "react-router-dom";
import { Stack, Box, Typography } from "@mui/material";
import createValidationMessage from "../constants/createValidationMessage";
import userServices from "../services/userServices";
import { useSelector, useDispatch } from "react-redux";

const ForgetPasword = () => {
  const [password, setPassword] = useState("");
  const { token } = useParams()
  const [errors, setErrors] = useState([]);
  const [error, setError] = useState();
  const [toggle, setToggle] = useState(false)
  const navigate = useNavigate();
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const { email } = useSelector((state) => state.user)

  const state = useSelector( state => state)

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  

  const handlePasswordUpdate = async () => {
    setError("");
    const bodyReq = { 
        email,
        password,
    }
    const res = await userServices.changePassword(bodyReq);
    navigate('/auth/login')
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
  
  const verifyAccess = async() => {
    const { data } = await userServices.verifyAccess({ token })
    setToggle(data.refused)
  }




  

  useEffect(() => {
    verifyAccess();
  }, [])

  if(toggle) return (<div>Access denided</div>)




 


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
        <h1 style={{ color: "#3C87F0" }}>Set new password</h1>
        <form onSubmit={handleSubmit}>
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
            disabled={!isPasswordValid}
            onClick={handlePasswordUpdate}
          >
            Set new password
          </button>
        </form>
      </Box>
    </Box>
  );
};

export default ForgetPasword;
