import React from "react";
import { Box, Stack } from "@mui/material";
import { images } from "../../constants";
import { useNavigate } from 'react-router-dom'

const Content = () => {
  const navigate = useNavigate()
  return (
    <Box sx={{ display: "flex", justifyContent: "center", mx: 10 }}>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          margin: "auto",
          mx: { xs: 6, md: 8 },
        }}
      >
        <Box
          sx={{
            width: { xs: "300px", md: "350px" },
            height: "400px",
            borderRadius: "20px",
            boxShadow: "0 0 10px rgba(0, 0, 0, 0.3)",
            background: "#C1D0E6",
            backgroundImage: `url(${images.lamp})`,
            backgroundSize: "100%",
            backgroundPosition: "0 100%",
            backgroundRepeat: "no-repeat",
            display: "flex",
            justifyContent: "center",
            py: 1,
            mr: { xs: 0, md: 4 },
            mt: 2,
            cursor: 'pointer',
          }}
          onClick={() => navigate('/admin/dashboard')}
        >
          <h2
            style={{ color: "#04396A", fontSize: "32px", textAlign: "center" }}
          >
            Dashboard
          </h2>
        </Box>

        <Box
          sx={{
            width: { xs: "300px", md: "350px" },
            height: "400px",
            borderRadius: "20px",
            boxShadow: "0 0 10px rgba(0, 0, 0, 0.3)",
            background: "#C1D0E6",
            backgroundImage: `url(${images.gennotification})`,
            backgroundSize: "100%",
            backgroundPosition: "0 100%",
            backgroundRepeat: "no-repeat",
            display: "flex",
            justifyContent: "center",
            py: 1,
            mr: { xs: 0, md: 4 },
            mt: 2,
            cursor: 'pointer',
          }}
          onClick={() => navigate('/admin/notification')}
        >
          <h2
            style={{ color: "#04396A", fontSize: "32px", textAlign: "center" }}
          >
            Send notifications to users
          </h2>
        </Box>

        <Box
          sx={{
            width: { xs: "300px", md: "350px" },
            height: "400px",
            borderRadius: "20px",
            boxShadow: "0 0 10px rgba(0, 0, 0, 0.3)",
            background: "#ECE6D8",
            backgroundImage: `url(${images.postlist})`,
            backgroundSize: "100%",
            backgroundPosition: "0 100%",
            backgroundRepeat: "no-repeat",
            display: "flex",
            justifyContent: "center",
            py: 1,
            mr: { xs: 0, md: 4 },
            mt: 2,
            cursor: 'pointer',
          }}
          onClick={() => navigate('/admin/reported_posts')}
        >
          <h2
            style={{ color: "#04396A", fontSize: "32px", textAlign: "center" }}
          >
            Reported post managment
          </h2>
        </Box>

        <Box
          sx={{
            width: { xs: "300px", md: "350px" },
            height: "400px",
            borderRadius: "20px",
            boxShadow: "0 0 10px rgba(0, 0, 0, 0.3)",
            background: "#ECE6D8",
            backgroundImage: `url(${images.postlist})`,
            backgroundSize: "100%",
            backgroundPosition: "0 100%",
            backgroundRepeat: "no-repeat",
            display: "flex",
            justifyContent: "center",
            py: 1,
            mr: { xs: 0, md: 4 },
            mt: 2,
            cursor: 'pointer',
          }}
          onClick={() => navigate('/admin/posts')}
        >
          <h2
            style={{ color: "#04396A", fontSize: "32px", textAlign: "center" }}
          >
            List of posts
          </h2>
        </Box>

        <Box
          sx={{
            width: { xs: "300px", md: "350px" },
            height: "400px",
            borderRadius: "20px",
            boxShadow: "0 0 10px rgba(0, 0, 0, 0.3)",
            background: "#ECE6D8",
            backgroundImage: `url(${images.userlist})`,
            backgroundSize: "100%",
            backgroundPosition: "0 100%",
            backgroundRepeat: "no-repeat",
            display: "flex",
            justifyContent: "center",
            py: 1,
            mr: { xs: 0, md: 4 },
            mt: 2,
            cursor: 'pointer',
          }}
          onClick={() => navigate('/admin/users')}
        >
          <h2
            style={{ color: "#04396A", fontSize: "32px", textAlign: "center" }}
          >
            List of users
          </h2>
        </Box>
      </Box>
    </Box>
  );
};

export default Content;
