import { Stack, Box, Typography } from "@mui/material";
import { FiFacebook, FiGithub, FiTwitter } from "react-icons/fi";
import { BsArrowRight } from "react-icons/bs";
import { images } from "../../constants";

const Footer = () => (
  <Box sx={{ backgroundColor: "#C1D0E6", mt: 8 }}>
    <Stack direction="column" sx={{ mx: { xs: 4, lg: 15 } }}>
      <Box
        sx={{
          mt: 6,
          display: "flex",
          alignItems: "center",
          borderBottom: "3px solid #99A9B7",
          pb: 6,
        }}
      >
        <h2
          style={{
            display: "flex",
            alignItems: "center",
            margin: 0,
            color: "#3C87F0",
            cursor: "pointer",
          }}
        >
          Visit our source code{" "}
          <BsArrowRight
            style={{ color: "#3C87F0", fontSize: "28px", marginLeft: "10px" }}
          />
        </h2>
        <span
          style={{
            color: "white",
            fontSize: "18px",
            textDecoration: "underline",
            marginLeft: "15px",
          }}
        >
          give us a star
        </span>
        <img src={images.star} />
      </Box>
      <Stack
        direction="row"
        sx={{
          flexWrap: "wrap",
          justifyContent: "space-between",
          mt: 6,
          width: { md: "75%" },
        }}
      >
        <Stack direction="column">
          <Typography
            variant="h4"
            sx={{
              color: "#04396A",
              fontFamily: "Urbanist",
              fontWeight: "700",
              fontSize: "26px",
              mb: 2,
            }}
          >
            Product
          </Typography>
          <Typography variant="p" sx={{ mb: 1, color: "#04396A" }}>
            Source
          </Typography>
          <Typography variant="p" sx={{ mb: 1, color: "#04396A" }}>
            Security
          </Typography>
          <Typography variant="p" sx={{ color: "#04396A" }}>
            Customer stories
          </Typography>
        </Stack>
        <Stack direction="column">
          <Typography
            variant="h4"
            sx={{
              color: "#04396A",
              fontFamily: "Urbanist",
              fontWeight: "700",
              fontSize: "26px",
              mb: 2,
            }}
          >
            Support
          </Typography>
          <Typography variant="p" sx={{ mb: 1, color: "#04396A" }}>
            Docs
          </Typography>
          <Typography variant="p" sx={{ mb: 1, color: "#04396A" }}>
            Contact ESI Community
          </Typography>
          <Typography variant="p" sx={{ color: "#04396A" }}>
            Customers
          </Typography>
        </Stack>
        <Stack direction="column">
          <Typography
            variant="h4"
            sx={{
              color: "#04396A",
              fontFamily: "Urbanist",
              fontWeight: "700",
              fontSize: "26px",
              mb: 2,
              mt: { xs: 4, sm: 0 },
            }}
          >
            About
          </Typography>
          <Typography variant="p" sx={{ mb: 1, color: "#04396A" }}>
            About Us
          </Typography>
          <Typography variant="p" sx={{ mb: 1, color: "#04396A" }}>
            Contact Us
          </Typography>
          <Typography variant="p" sx={{ mb: 1, color: "#04396A" }}>
            Jobs
          </Typography>
        </Stack>
      </Stack>
      <Stack
        direction={{ xs: "column", md: "row" }}
        sx={{
          mt: 18,
          mb: 2,
          justifyContent: { md: "space-between" },
          alignItems: { xs: "center", md: "start" },
        }}
      >
        <Box>
          <Typography
            variant="h5"
            sx={{
              fontFamily: "Urbanist",
              fontWeight: "600",
              fontSize: "22px",
              mb: 1,
              color: "#04396A",
            }}
          >
            © ESI Community 2023 All rights reserved
          </Typography>
          <Typography variant="p" sx={{ fontWeight: "200", color: "#04396A" }}>
            Privacy &nbsp;&nbsp; Policy &nbsp;&nbsp; Terms of Service
          </Typography>
        </Box>
        <Stack
          direction="row"
          alignItems="start"
          sx={{ fontSize: "30px", mt: { xs: 4, md: 0 } }}
        >
          <FiFacebook
            style={{ marginRight: "30px", color: "#04396A", cursor: "pointer" }}
          />
          <FiGithub
            style={{ marginRight: "30px", color: "#04396A", cursor: "pointer" }}
          />
          <FiTwitter style={{ color: "#04396A", cursor: "pointer" }} />
        </Stack>
      </Stack>
    </Stack>
  </Box>
);

export default Footer;
