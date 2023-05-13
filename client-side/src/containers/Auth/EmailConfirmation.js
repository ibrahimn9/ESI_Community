import { useState, useEffect } from "react";
import user from "../../services/userServices";
import { useNavigate } from "react-router-dom";
import { Stack, Box } from "@mui/material";
import { images } from "../../constants";
import { useSelector } from "react-redux";

const EmailConfirmation = () => {
  const [code, setCode] = useState("");
  const [validCode, setValidCode] = useState(false);
  const navigate = useNavigate();
  const newUser = useSelector((state) => state);

  const handleCodeChange = async (event) => {
    const code = event.target.value;
    if (code.length === 6) {
      const { data } = await user.confirmEmail({ code });
      setValidCode(data.valid);
      if (data.valid) {
        navigate("/auth/complete_submition");
      }
    }
    setCode(code)
  };

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  const resendCode = async () => {
    const { email } = newUser;
    await user.sendEmail({ email });
  };

  return (
    <>
      <Stack sx={{ p: 4 }}>
        <img src={images.logo} height={80} />
      </Stack>
      <Box
        sx={{
          position: "relative",
          transform: "translateX(-50%)",
          left: "50%",
          width: { xs: "60%", md: "30%" },
          marginTop: "100px",
          p: 4,
          borderRadius: "10px",
          background: "#F0F0F0",
          boxShadow: "0 0 10px rgba(0, 0, 0, 0.3)",
        }}
      >
        <form
          onSubmit={handleSubmit}
          className="auth-form email-confirmation"
        >
          <span>We sent a launch code to your email </span>
          <label>Enter code</label>
          <input type="text" onChange={handleCodeChange} maxLength={6} />
          {code.length === 6 && !validCode && (
            <div style={{ color: "#d29922", marginTop: "5px" }}>
              Invalid launch code.
            </div>
          )}
        </form>
        <div className="auth-msg">
          Didn't get your email?{" "}
          <span className="auth-link" onClick={resendCode}>
            Resend the code
          </span>
        </div>
      </Box>
    </>
  );
};

export default EmailConfirmation;
