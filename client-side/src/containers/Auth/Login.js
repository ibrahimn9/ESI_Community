import { useState } from "react";
import { Stack, Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { images } from "../../constants";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
  };

  const handleEmailChange = (e) => {
    const email = e.target.value;
    setEmail(email);
  };

  const handlePasswordChange = (e) => {
    const password = e.target.value;
    setPassword(password);
  };

  return (
    <Box
      sx={{
        position: "relative",
        transform: "translateX(-50%)",
        left: "50%",
        width: { xs: "70%", md: "30%" },
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        mt: 6,
      }}
    >
      <img src={images.logo} />
      <h2 style={{ color: "white" }}>Sign in to ESI Community</h2>
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
        <form className="auth-form login-form" onSubmit={handleLogin}>
          <label>Email address</label>
          <input type="email" value={email} onChange={handleEmailChange} />
          <Stack direction="row" sx={{ justifyContent: "space-between" }}>
            <label>Password</label>
            <label className="auth-link">Forgot password?</label>
          </Stack>
          <input type="password" onChange={handlePasswordChange} />
          <button
            type="submit"
            className="login-btn btn"
          >
            Sign in
          </button>
        </form>
      </Box>
      <Box
        sx={{
          mt: "20px",
          px: 4,
          py: 2,
          borderRadius: "10px",
          border: "1px solid  #202637",
          background: "#1e1e1e",
          boxShadow: "0 0 10px #121212",
          width: "100%",
        }}
      >
        <div
          className="auth-msg"
          style={{
            position: "relative",
            left: "50%",
            marginLeft: "0",
            transform: "translate(-50%,-50%)",
            textAlign: "center",
          }}
        >
          New to ESI Community?{" "}
          <Link to="/auth/signup">
            <span className="auth-link">Create an acount.</span>
          </Link>
        </div>
      </Box>
    </Box>
  );
};

export default Login;
