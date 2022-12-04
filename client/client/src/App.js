import "./App.css";
import axios from "axios";
import React, { useEffect, useState } from "react";

function App() {
  const [artist, setArtist] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    console.log(artist);
    const options = {
      method: "GET",
      url: "http://localhost:4000/wikipedia",
      params: { artistName: artist },
    };
    axios
      .request(options)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Artist Name:
          <input
            type="text"
            value={artist}
            name="zip"
            onChange={(e) => setArtist(e.target.value)}
          />
        </label>
        <input type="submit" value="Submit" />
      </form>
import { Search } from "./Search";
import { useState } from "react";

function App() {
  const [isToggled, setIsToggled] = useState(false);
  return (
    <div className="App">
      <button onClick={() => setIsToggled(!isToggled)}>Toggle</button>
      {isToggled && <Search />}
    </div>
  );
}

export default App;
