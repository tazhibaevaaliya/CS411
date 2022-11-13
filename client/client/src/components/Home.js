import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { FixedSizeList, ListChildComponentProps } from "react-window";
import Divider from "@mui/material/Divider";
import spotifyLogo from "./assets/spotify_logo.png";
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

function Home() {
  useEffect(() => {
    fetchItems();
  }, []);

  const [items, setItems] = useState([]);

  const fetchItems = async () => {
    const data = await fetch('/');
    const items = await data.json();
    setItems(items);
  };
  return (

    <section>
    {
    items.map(item => (
        <div class="container-fluid p-3 w-50">
            <div class="card-deck">
                <div class="card">
                    <div class="card-body p-1">
                        <h6 class="card-title">{item.name}</h6>
                        <p class="card-text">{item.msg}</p>
                  <p class="card-text"><i>by {item.username}</i></p>
                    </div>
                </div>
            </div>
        </div>
    ))
    }
</section>
    // <div className="App">
    //   <div>
    //     <h1 style={{ textAlign: "center" }}>Form to choose the Local Artist</h1>
    //   </div>

    //   <Box sx={{ ...commonStyles }}>
    //     <div style={{ display: "flex", marginLeft: "20px" }}>
    //       <h4 style={{ marginRight: "20px" }}>Your Favourite Artist Name</h4>
    //       <TextField
    //         id="outlined-basic"
    //         label="Artist name"
    //         variant="outlined"
    //       />
    //     </div>
    //     <Divider style={{ margin: "20px" }} />
    //     <div style={{ display: "flex" }}>
    //       <div
    //         style={{
    //           border: "solid",
    //           borderWidth: "0.3px",
    //           margin: "0 20px",
    //           width: "max-content",
    //         }}
    //       >
    //         <FixedSizeList
    //           height={400}
    //           width={360}
    //           itemSize={46}
    //           itemCount={200}
    //           overscanCount={5}
    //         >
    //           <ListItem
    //             // style={style}
    //             // key={index}
    //             component="div"
    //             disablePadding
    //           >
    //             <ListItemButton>
    //               {items.map((item) => (
    //                 <ListItemText primary={item.name} />
    //               ))}
    //             </ListItemButton>
    //           </ListItem>
    //         </FixedSizeList>
    //       </div>
    //       <div style={{ margin: "10px 150px" }}>
    //         <img src={spotifyLogo} alt="fireSpot" />
    //       </div>
    //     </div>
    //   </Box>
    // </div>
  );
}

export default Home;
