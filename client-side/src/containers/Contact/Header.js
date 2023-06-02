import { Stack, Box } from "@mui/material";
import { contactBg } from "../../constants/svg";
import userServices from "../../services/userServices";
import { useState } from "react";

const Header = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async() => {
    const emailText = {
      subject: `User send you a message`,
      text: `<p>this message was sended by <a>${email}</a></p>
             <p>${message}</p>
      `
    }
    const  response  = await userServices.sendMessage(emailText, ['esicommunity23@gmail.com']);
  }

  return (
    <Box
      sx={{
        mx: { xs: 4, lg: 8 },
        mb: 4,
      }}
    >
      {" "}
      <Box sx={{ textAlign: "center", width: "50%" }}>
        <h1 className="header-title">Contact Us</h1>
        <h4 className="header-sub-title">
          Any question or remarks? Just write us a message!
        </h4>
      </Box>
      <Stack direction="row">
        <Box
          sx={{
            display: { xs: "none", lg: "block" },
            flexBasis: "50%",
          }}
        >
          {contactBg.contactLgBg}
        </Box>
        <Box>
          <form className="contact-form" onSubmit={handleSubmit}>
            <input
              type="email"
              placeholder="Enter your email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
            <textarea placeholder="Enter your message" onChange={(e) => setMessage(e.target.value)} />
            <button className="login-btn btn" style={{ background: "#d12f58" }}>
              Send
            </button>
          </form>
        </Box>
      </Stack>
    </Box>
  );
};

export default Header;
