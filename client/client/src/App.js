import "./App.css";
import axios from "axios";
import React, { useState } from "react";

function App() {
  const [artist, setArtist] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    axios.post("http://localhost:4000", { artist: artist }).then((res) => {
      console.log(res);
    });
  }

  const handleChange = (event) => {
    setArtist(event.target.value);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Artist Name:
          <input
            type="text"
            value={artist}
            name="zip"
            onChange={handleChange}
          />
        </label>
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
}

export default App;
