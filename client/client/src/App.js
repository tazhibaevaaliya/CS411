import "./App.css";
import React, { useEffect, useState } from "react";
import WikiSearch from "./components/WikiSearch";
// import SpotifySearch from "./components/SpotifySearch";

function App() {
  return (
    <div style={{ display: "flex", flexDirection: "row" }}>
      <div style={{ width: "50%" }}>
        {/* <SpotifySearch></SpotifySearch> */}
      </div>
      <div class="vl"></div>
      <div style={{ width: "50%" }}>
        <WikiSearch></WikiSearch>
      </div>
    </div>
  );
}

export default App;
