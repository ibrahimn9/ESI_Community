import { Box, Stack } from "@mui/material";
import { images } from "../../constants";

const NavBar = () => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        py: 6,
        width: "100%",
        top: 0,
      }}
    >
      <img src={images.logo} height={80} />
    </Box>
  );
};

export default NavBar;
