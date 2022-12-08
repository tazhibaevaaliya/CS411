import "./App.css";
import React, { useEffect, useState } from "react";
import WikiSearch from "./components/WikiSearch";
import Cookies from "universal-cookie";
import { MDBBtn, MDBIcon } from "mdb-react-ui-kit";
import Button from "@mui/material/Button";
import LogIn from "./components/LogIn";

function App() {
  const cookies = new Cookies();
  const isLoggedIn = cookies.get("isLoggedIn") ?? false;

  return isLoggedIn ? (
    <div style={{ display: "flex", flexDirection: "row" }}>
      <div style={{ width: "50%" }}>
        {/* <SpotifySearch></SpotifySearch> */}
      </div>
      <div class="vl"></div>
      <div style={{ width: "50%" }}>
        <WikiSearch></WikiSearch>
      </div>
    </div>
  ) : (
    <LogIn></LogIn>
  );
}

export default App;
