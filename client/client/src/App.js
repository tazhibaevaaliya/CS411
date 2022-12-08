import "./App.css";
import React, { useEffect, useState } from "react";
import WikiSearch from "./components/WikiSearch";
import SpotifySearch from "./components/SpotifySearch";
import Cookies from "universal-cookie";
import { MDBBtn, MDBIcon } from "mdb-react-ui-kit";
import Button from "@mui/material/Button";
import LogIn from "./components/LogIn";
import LogOut from "./components/LogOut";

function App() {
  const cookies = new Cookies();
  const [userCookies, setUserCookies] = useState(cookies.get("isLoggedIn"));
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    setIsLoggedIn(cookies.get("isLoggedIn"));
  }, [userCookies]);

  // const isLoggedIn = cookies.get("isLoggedIn") ?? false;
  return isLoggedIn ? (
    <div className="logOut">
      <div style={{ position: "relative", margin: "10px" }}>
        <LogOut></LogOut>
      </div>
      <div style={{ display: "flex", flexDirection: "row", width: "100%" }}>
        <div style={{ width: "50%" }}>
          <SpotifySearch></SpotifySearch>
        </div>
        <div class="vl"></div>
        <div style={{ width: "50%" }}>
          <div>
            <WikiSearch></WikiSearch>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <LogIn></LogIn>
  );
}

export default App;
