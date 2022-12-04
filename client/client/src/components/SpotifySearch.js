import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { FixedSizeList, ListChildComponentProps } from "react-window";
import Divider from "@mui/material/Divider";
import spotifyLogo from "../assets/spotify_logo.png";
import React, { useEffect, useState } from "react";

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
  function handleSubmit(event) {
    event.preventDefault();
    console.log(search);
    const options = {
      method: "GET",
      url: "http://localhost:4000/wikipedia",
      params: { artistName: search },
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
        {/* {searchInfo.totalhits ? (
          <p>Search Results: {searchInfo.totalhits}</p>
        ) : (
          ""
        )} */}
      </header>
      <div className="results">
        {results.map((result, i) => {
          const url = `https://en.wikipedia.org/?curid=${result.pageid}`;
          return (
            <div className="result" key={i}>
              <h3>{result.title}</h3>
              <p dangerouslySetInnerHTML={{ __html: result.snippet }}></p>
              <a href={url} target="_blank" rel="noreferrer">
                Read more
              </a>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default SpotifySearch;
