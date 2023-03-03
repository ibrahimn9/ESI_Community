import { useState } from "react";
import { Stack, Box, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { images } from "../../constants";
import user from "../../services/user";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
  }

  const handleLogin = async () => {
    const { data } = await user.login({ email, password })
    if(data.token) {
      window.localStorage.setItem("loggedUser", JSON.stringify(data))
      setMsg("");
      const id = data.id;
      navigate(`/user_home/${id}`);
    } 
    if(data.error) {
      setMsg(data.error);
    }
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
        <form className="auth-form login-form" onSubmit={handleSubmit}>
          <label>Email address</label>
          <input type="email" value={email} onChange={handleEmailChange} />
          <Stack direction="row" sx={{ justifyContent: "space-between" }}>
            <label>Password</label>
            <label className="auth-link">Forgot password?</label>
          </Stack>
          <input type="password" value={password} onChange={handlePasswordChange} />
          <button
            onClick={handleLogin}
            className="login-btn btn"
          >
            Sign in
          </button>
        </form>
      </Box>
          {msg && <div className="auth-msg">{msg}</div>}
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