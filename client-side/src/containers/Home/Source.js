import { Stack, Box, Typography } from "@mui/material";
import { BsArrowRight } from "react-icons/bs";
import { TfiStar } from "react-icons/tfi";
import { images } from "../../constants";

const Source = () => (
  <Box sx={{ background: "#FFFAFA"}}>
    <Box sx={{ mx: { xs: 4, lg: 15 }}}>
      <Stack
        direction={{ xs: "column", md: "row" }}
        sx={{
          justifyContent: { md: "space-between" },
          alignItems: { xs: "center", md: "start" },
        }}
      >
        <Stack
          direction="column"
          justifyContent="center"
          alignItems="center"
          sx={{ mt: 20 }}
        >
          <Typography
            variant="h3"
            color="#1F2025"
            sx={{
              fontWeight: "900",
              fontSize: { xs: "28px", md: "42px", lg: "48px" },
              fontFamily: "Urbanist",
            }}
          >
            Read our source code
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center", mt: 1, mb: 5 }}>
            <Typography variant="p" sx={{ fontSize: "18px" }}>
              Give it a star{" "}
            </Typography>
            <TfiStar />
          </Box>
          <img src={images.github} alt="" />
        </Stack>
        <Typography
          variant="h4"
          sx={{
            fontSize: "26px",
            fontFamily: "Urbanist",
            fontWeight: "700",
            color: "#205BF1",
            mt: { xs: 5, md: 22 },
            display: 'flex',
            alignItems: 'center'
          }}
          className="github-link"
        >
          Visit source code{" "}
          <BsArrowRight style={{ color: "#205BF1", fontSize: "28px", marginLeft: '10px' }} />
        </Typography>
      </Stack>
    </Box>
  </Box>
);

export default Source;
