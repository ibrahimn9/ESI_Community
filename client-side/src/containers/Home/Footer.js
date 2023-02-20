import { Stack, Box, Typography } from "@mui/material";
import { FiFacebook, FiGithub, FiTwitter } from "react-icons/fi";

const Footer = () => (
  <Box sx={{ backgroundColor: "#F7F2F2" }} className="footer">
    <Stack direction="column" sx={{ mx: { xs: 4, lg: 15 } }}>
      <Stack
        direction="row"
        sx={{
          flexWrap: "wrap",
          justifyContent: "space-between",
          mt: 18,
          width: { md: "75%" },
        }}
      >
        <Stack direction="column">
          <Typography
            variant="h4"
            sx={{
              color: "#1e1f24",
              fontFamily: "Urbanist",
              fontWeight: "600",
              fontSize: "26px",
              mb: 2,
            }}
          >
            Product
          </Typography>
          <Typography variant="p" sx={{ mb: 1 }}>
            Source
          </Typography>
          <Typography variant="p" sx={{ mb: 1 }}>
            Security
          </Typography>
          <Typography variant="p">Customer stories</Typography>
        </Stack>
        <Stack direction="column">
          <Typography
            variant="h4"
            sx={{
              color: "#1e1f24",
              fontFamily: "Urbanist",
              fontWeight: "600",
              fontSize: "26px",
              mb: 2,
            }}
          >
            Support
          </Typography>
          <Typography variant="p" sx={{ mb: 1 }}>
            Docs
          </Typography>
          <Typography variant="p" sx={{ mb: 1 }}>
            Contact ESI Community
          </Typography>
          <Typography variant="p">Customers</Typography>
        </Stack>
        <Stack direction="column">
          <Typography
            variant="h4"
            sx={{
              color: "#1e1f24",
              fontFamily: "Urbanist",
              fontWeight: "600",
              fontSize: "26px",
              mb: 2,
              mt: { xs: 4, sm: 0 },
            }}
          >
            About
          </Typography>
          <Typography variant="p" sx={{ mb: 1 }}>
            About Us
          </Typography>
          <Typography variant="p" sx={{ mb: 1 }}>
            Contact Us
          </Typography>
          <Typography variant="p" sx={{ mb: 1 }}>
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
            }}
          >
            © ESI Community 2023 All rights reserved
          </Typography>
          <Typography variant="p" sx={{ fontWeight: "200", color: "#898789" }}>
            Privacy Policy Terms of Service
          </Typography>
        </Box>
        <Stack
          direction="row"
          alignItems="start"
          sx={{ fontSize: "30px", mt: { xs: 4, md: 0 } }}
        >
          <FiFacebook style={{ marginRight: "30px" }} />
          <FiGithub style={{ marginRight: "30px" }} />
          <FiTwitter />
        </Stack>
      </Stack>
    </Stack>
  </Box>
);

export default Footer;
