import { Stack, Box, Typography } from "@mui/material";
import { images } from "../../constants";
import { Link } from "react-router-dom";
import { FaChevronRight } from "react-icons/fa";

const Content = () => (
  <Box className="home_content">
    <Box sx={{ mx: { xs: 4, lg: 15 }, mt: { xs: 18, md: 28, lg: 20 } }}>
      <Stack
        sx={{
          flexDirection: { xs: "column", md: "row" },
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box sx={{ flexBasis: "60%" }}>
          <Typography
            variant="h2"
            sx={{
              color: "#04396A",
              fontWeight: "900",
              fontSize: { xs: "28px", md: "42px", lg: "48px" },
              fontFamily: "Urbanist",
            }}
          >
            ESI Community is a community for{" "}
            <span style={{ color: "#F2C344DB" }}>ESI-SBA students</span>
          </Typography>
          <Typography
            variant="h6"
            sx={{
              color: "#04396A",
              fontFamily: "Urbanist",
              fontSize: "18px",
              fontWeight: "500",
              letterSpacing: ".1rem",
              mt: 2,
            }}
          >
            We ‘re a place where students share, learn, stay up-to-date and grow
            their careers.
          </Typography>
        </Box>
        <img src={images.telescope} className="content-img" alt="" />
      </Stack>
      <Box sx={{ mt: { xs: 24, lg: 30 } }}>
        <Typography
          variant="h2"
          sx={{
            color: "#04396A",
            fontWeight: "900",
            fontSize: { xs: "28px", md: "42px", lg: "48px" },
            fontFamily: "Urbanist",
            width: { md: "60%" },
          }}
        >
          Share documents and resources{" "}
          <span style={{ color: "#F2C344" }}>that can help others</span>
        </Typography>
        <Stack
          sx={{
            flexDirection: { xs: "column", md: "row" },
            justifyContent: "space-between",
            alignItems: "center",
            mt: { md: 14 },
          }}
        >
          <img src={images.lamp} alt="" className="content-img" />
          <Stack direction="column" flexBasis="40%">
            <Box className="content-box">
              <Typography
                variant="h5"
                sx={{
                  color: "#04396A",
                  fontWeight: "800",
                  fontFamily: "Urbanist",
                  mb: 1,
                }}
              >
                Be Organized
              </Typography>
              <Typography
                variant="p"
                sx={{
                  color: "#04396A",
                  fontFamily: "Urbanist",
                  fontSize: "18px",
                  fontWeight: "400",
                }}
              >
                Set an appropriate title for your post and provide more
                information about the topic.
              </Typography>
            </Box>
            <Box className="content-box">
              <Typography
                variant="h5"
                sx={{
                  color: "#04396A",
                  fontWeight: "800",
                  fontFamily: "Urbanist",
                  mb: 1,
                }}
              >
                Be sure
              </Typography>
              <Typography
                variant="p"
                sx={{
                  color: "#04396A",
                  fontFamily: "Urbanist",
                  fontSize: "18px",
                  fontWeight: "400",
                }}
              >
                Make sure that the information you want to publish has not been
                previously published by anyone.
              </Typography>
            </Box>
            <Box className="content-box">
              <Typography
                variant="h5"
                sx={{
                  color: "#04396A",
                  fontWeight: "800",
                  fontFamily: "Urbanist",
                  mb: 1,
                }}
              >
                Be in the right place
              </Typography>
              <Typography
                variant="p"
                sx={{
                  color: "#04396A",
                  fontFamily: "Urbanist",
                  fontSize: "18px",
                  fontWeight: "400",
                }}
              >
                Specify the topics of the documents in order to save them in
                their designed location.
              </Typography>
            </Box>
          </Stack>
        </Stack>
      </Box>
      <Stack
        direction={{ xs: "column", md: "row" }}
        sx={{
          alignItems: "center",
          justifyContent: "space-between",
          mt: { xs: 24, lg: 30 },
        }}
      >
        <Box>
          <Typography
            variant="h2"
            sx={{
              color: "#04396A",
              fontWeight: "900",
              fontSize: { xs: "28px", md: "42px", lg: "48px" },
              fontFamily: "Urbanist",
              width: { md: "60%" },
            }}
          >
            Earn more points and get an{" "}
            <span style={{ color: "#F2C344" }}>upgrade</span>
          </Typography>
          <Link to="/docs" style={{ textDecoration: "none" }}>
            <button className="primary-btn content-primary-btn info-btn btn">
              Read more information <FaChevronRight />
            </button>
          </Link>
        </Box>
        <img src={images.upgrade} alt="" className="content-img ratio" />
      </Stack>
      <Box
        className="about-box"
        sx={{
          background:
            "linear-gradient(145.6deg,rgba(60, 135, 240, 0.93) 0%,rgba(4, 57, 106, 0.93) 101.36%)",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            flexBasis: { xs: "80%", md: "40%" },
          }}
        >
          <Typography
            variant="h2"
            sx={{
              color: "white",
              fontWeight: "700",
              fontSize: { xs: "28px", md: "42px", lg: "48px" },
              fontFamily: "Urbanist",
            }}
          >
            About Us
          </Typography>
          <Typography
            variant="p"
            sx={{
              color: "white",
              fontFamily: "Urbanist",
              fontSize: "16px",
              fontWeight: "400",
              textAlign: "center",
              mt: 4,
            }}
          >
            We are students from ESI SBA, this is our 2CPI project. Whether you
            have a comment or suggestion to share, we look forward to hearing
            from you. Feel free to contact us.
          </Typography>
          <Link to="/contact" style={{ textDecoration: "none" }}>
            <button className="primary-btn content-primary-btn btn">
              Contact Us <FaChevronRight />
            </button>
          </Link>
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: {xs: 'column', md: 'row'},
          justifyContent: {xs: 'center', md: 'space-between'},
          alignItems: "center",
          mt: 26,
        }}
      >
        <img src={images.final} className='content-img' />
        <Box
          sx={{
            flexBasis: { xs: "90%", md: "50%" },
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <Typography
            variant="h2"
            sx={{
              color: "#04396A",
              fontWeight: "900",
              fontSize: { xs: "28px", md: "42px", lg: "48px" },
              fontFamily: "Urbanist",
              textAlign: "center",
            }}
          >
            Let’s build our place
          </Typography>
          <Typography
            variant="p"
            sx={{
              color: "#04396A",
              fontFamily: "Urbanist",
              fontSize: "18px",
              fontWeight: "400",
              textAlign: "center",
              mt: 4,
              mb: 1,
            }}
          >
            Whether you’re searching for resources to help you in your study
            career or just want to improve your skills, ESI Community is your
            home. Join us and enjoy the experience.
          </Typography>
          <Link to="/auth/signup">
            <button
              className="primary-btn content-primary-btn btn"
              style={{ marginBottom: "100px" }}
            >
              Sign up <FaChevronRight />
            </button>
          </Link>
        </Box>
      </Box>
    </Box>
  </Box>
);

export default Content;
