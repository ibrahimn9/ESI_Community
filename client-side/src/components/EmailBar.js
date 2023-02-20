import { useState } from "react";
import { Paper } from "@mui/material";
import { TbSend } from "react-icons/tb";

const EmailBar = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    //verify email function
  };

  return (
    <Paper
      component="form"
      onSubmit={handleSubmit}
      sx={{
        borderRadius: '3px',
        position: 'relative',
        pl: 2,
        width: {md: '70%', lg: "85%"},
        mt: {md : 8, lg: 4,},
        display: {xs: 'none' ,md:"flex"},
        justifyContent: "space-between",
        boxShadow: "0px 4px 5px #121212",
      }}
      className='email-bar'
    >
      <input
        className="email-bar-input"
        placeHolder="Email adress"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button type="submit" className="primary-btn header-btn btn">
        Sign up <TbSend />
      </button>
    </Paper>
  );
};

export default EmailBar;
