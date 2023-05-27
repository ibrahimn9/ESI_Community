import { Box, Stack } from "@mui/material";
import { images } from "../../constants";
import { MdLogout } from "react-icons/md";
import { useNavigate, Link } from "react-router-dom";

const NavBar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    window.localStorage.clear();
    navigate("/auth/login");
  };
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
      <Box
        sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
      >
        <img src={images.logo} height={80} />
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            mb: 3,
            cursor: "pointer",
          }}
          className="cat toggle-cat"
          onClick={handleLogout}
        >
          <span>
            <MdLogout />
          </span>
          <h4 style={{ margin: "0", marginBottom: "5px" }}>Logout</h4>
        </Box>
      </Box>
    </Box>
  );
};

export default NavBar;
