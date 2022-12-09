import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { FixedSizeList, ListChildComponentProps } from "react-window";
import Divider from "@mui/material/Divider";
import spotifyLogo from "../assets/spotify_logo.png";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "universal-cookie";

const commonStyles = {
  bgcolor: "background.paper",
  m: 1,
  borderColor: "text.primary",
  margin: "0 400px",
  padding: "10px",
  display: "flex",
  justifyContent: "left",
  border: 1,
  zIndex: 1,
  backgroundColor: "#bde5af",
  flexDirection: "column",
};

function SpotifySearch() {
  const [search, setSearch] = useState("");
  const [results, setResults] = useState([]);
  const [searchInfo, setSearchInfo] = useState({});

  const cookies = new Cookies();
  const { id, token_type } = cookies.get("userInformation");

  function handleSubmit(event) {
    event.preventDefault();
    console.log(search);
    const options = {
      method: "GET",
      url: "http://localhost:4000/spotify",
      params: { artistName: search, id: id, token_type: token_type },
    };
    axios
      .request(options)
      .then((response) => {
        console.log(response);
        setResults(response.data.query.search);
        setSearchInfo(response.data.query.searchinfo);
        console.log(searchInfo);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  return (
    <div className="searchPage">
      <header>
        <h1>Spotify Seeker</h1>
        <form className="search-box" onSubmit={handleSubmit}>
          <input
            type="search"
            placeholder="Which artist are you looking for?"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </form>
      </header>
    </div>
  );
}

export default SpotifySearch;
