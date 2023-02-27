import { useState } from "react";
import { Stack, Box } from "@mui/material";
import { Link } from "react-router-dom";
import { TbGridDots } from "react-icons/tb";

import { images } from "../../constants";


const NavBar = () => {
  const [toggle, setToggle] = useState(false);
  return (
    <Stack
      direction="row"
      alignItems="center"
      px={{ xs: 4, lg: 15 }}
      py={2}
      sx={{ top: '0', justifyContent:"space-between"}}
    >
      <Link to="/" style={{ display: "flex", alignItems: "center" }}>
        <img src={images.logo} alt="logo" height={25} />
      </Link>
      <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" }, ml: 10 }}>
        {["security", "content", "about", "docs", "contact", "source"].map(
          (item) => (
            <a key={item} href={`${item}`} className="home_navbar-link">
              {item}
            </a>
          )
        )}
      </Box>
      <Box>
        <TbGridDots
          className="home_navbar-links__btn"
          onClick={() => setToggle(!toggle)}
        />
        {toggle && (
          <Box className="home_navbar-links--toggled">
            {["security", "content", "about", "docs", "contact", "source"].map(
              (item) => (
                <a key={item} href={`${item}`} className="home_navbar-link link--toggled">
                  {item}
                </a>
              )
            )}
          </Box>
        )}
      </Box>
      <Box sx={{ display: "flex", flexWrap: "nowrap", alignItems: "center" }}>
        <Link to="/auth/login">
          <button className="text-btn nav-btn btn">Sign in</button>
        </Link>
        <Link to="/auth/signup">
          <button className="primary-btn nav-btn btn">Sign up</button>
        </Link>
      </Box>
    </Stack>
  );
};

export default NavBar;
