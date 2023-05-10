import { useState } from "react";
import { Paper } from "@mui/material";
import { FiSearch } from 'react-icons/fi'
import { useNavigate } from "react-router-dom";

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {

    if (searchTerm) {
      navigate(`/search/${searchTerm}`);
      setSearchTerm("");
    }
  };

  return (
    <Paper
      component="form"
      className='search-form'
      onSubmit={handleSubmit}
      sx={{
        borderRadius: 6,
        pl: 2,
        display: {xs: 'none', sm: 'flex'},
        alignItems: 'center',
        boxShadow: "none",
        fontFamily: 'Urbanist',
        mr: { sm: 5 },
      }}
    >
      <input
        className="search-bar"
        placeholder="Search..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button
        type="submit"
        className="nos-btn btn"
        sx={{ p: "10px", color: "red" }}
        aria-label="search"
      >
        <FiSearch />
      </button>
    </Paper>
  );
};

export default SearchBar;
