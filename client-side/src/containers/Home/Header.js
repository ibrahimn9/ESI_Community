import { Stack, Typography, Box, Divider } from "@mui/material";
import { images } from "../../constants";
import { EmailBar } from "../../components";
import { Link } from "react-router-dom";

const Header = () => (
  <>
    <Stack
      alignItem="center"
      sx={{
        mx: { xs: 4, lg: 15 },
        top: "0",
        justifyContent: { xs: "center", lg: "space-between" },
        flexDirection: { xs: "column", lg: "row" },
      }}
    >
      <Box className="home_header__right-box">
        <Typography
          variant="h1"
          sx={{
            fontSize: { xs: "44px", md: "60px", lg: "70px" },
            fontWeight: "900",
            textAlign: { xs: "center", lg: "left" },
            color: "#04396A",
            mt: 16,
            fontFamily: "Urbanist",
          }}
        >
          <span style={{ color: "#3C87F0" }}>Together</span>, we can build a
          better place
        </Typography>
        <Typography
          variant="h6"
          sx={{
            color: "#99A9B7ED",
            fontFamily: "Urbanist",
            textAlign: { xs: "center", lg: "left" },
            fontSize: "18px",
            fontWeight: "500",
            letterSpacing: ".1rem",
            mt: 2,
            ml: 1,
          }}
        >
          For studying, exchanging knowledge, and improving our skills!
        </Typography>
        <EmailBar />
        <Stack
          direction="row"
          sx={{
            justifyContent: "center",
            alignItems: "center",
            mt: 4,
            display: { md: "none" },
          }}
        >
          <Link to="/auth/signup">
            <button className="primary-btn header-primary-btn--xs btn">
              Sign up
            </button>
          </Link>
          <Link to="/auth/login">
            <button className="header-secondary-btn--xs btn">Sign in</button>
          </Link>
        </Stack>
      </Box>
      <Box
        sx={{
          mt: 10,
        }}
        className="home_header__img"
      >
        <img
          src={images.publication}
          alt="e"
          style={{
            width: "240px",
            borderRadius: "5px",
            boxShadow: "0 0 10px rgba(0, 0, 0, 0.3)",
          }}
        />
        <img
          src={images.upgradepub}
          alt=""
          style={{
            width: "245px",
            borderRadius: "5px",
            boxShadow: "0 0 10px rgba(0, 0, 0, 0.3)",
          }}
        />
        <img
          src={images.dbpub}
          alt=""
          style={{
            width: "240px",
            borderRadius: "5px",
            boxShadow: "0 0 10px rgba(0, 0, 0, 0.3)",
          }}
        />
      </Box>
    </Stack>
    <Box
      sx={{
        position: { lg: "absolute" },
        top: { lg: "85vh" },
        mx: { xs: 4, lg: 15 },
        width: { xs: "84%", md: "94%", lg: "40%" },
        mt: { xs: 15, lg: 1 },
      }}
    ></Box>
  </>
);

export default Header;
