import { Stack, Box } from "@mui/material";
import { contactBg } from "../../constants/svg";

const Header = () => {
  return (
    <Box
      sx={{
        mx: { xs: 4, lg: 8 },
        mb: 4,

      }}
    >
      {" "}
      <Box sx={{ textAlign: 'center', width: '50%'}}>
        <h1 className="header-title">Contact Us</h1>
        <h4 className="header-sub-title">
          Any question or remarks? Just write us a message!
        </h4>
      </Box>
      <Stack direction="row">
        <Box
          sx={{
            display: { xs: "none", lg: "block" },
            flexBasis: '50%'
          }}
        >
          {contactBg.contactLgBg}
        </Box>
        <Box>
          <form className="contact-form">
            <input type="email" placeholder="Enter your email" />
            <textarea placeholder="Enter your message"/>
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
