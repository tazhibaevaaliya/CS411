import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "universal-cookie";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import List from "@mui/material/List";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

function SpotifySearch() {
  const [search, setSearch] = useState("");
  const [results, setResults] = useState([]);
  const [searchInfo, setSearchInfo] = useState({});

  const cookies = new Cookies();
  const { id, token_type } = cookies.get("userInformation");

  function handleSubmit(event) {
    event.preventDefault();
    const options = {
      method: "GET",
      url: "http://localhost:4000/spotify",
      params: { artistName: search, id: id, token_type: token_type },
    };
    axios
      .request(options)
      .then((response) => {
        setResults(response.data.artists.items);
        console.log(response.data.artists.items);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  const handleFollowClick = (artistID) => {
    const options = {
      method: "GET",
      url: "http://localhost:4000/follow",
      params: { artistID: artistID, id: id, token_type: token_type },
    };
    axios
      .request(options)
      .then((response) => {
        console.log(response)
        // setResults(response.data.artists.items);
        // console.log(response.data.artists.items);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    console.log(results);
  }, [results]);

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
      {results.length !== 0 ? (
        <div>
          <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2}>
              {results.map((result) => (
                <Grid item xs={4}>
                  <Card sx={{ maxWidth: 345 }}>
                    <CardMedia
                      component="img"
                      alt="green iguana"
                      height="440"
                      src={
                        result.images[0]?.url ??
                        "https://www.singersongwritermusician.com/wp-content/plugins/woocommerce/assets/images/placeholder.png"
                      }
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="div">
                        {result.name}
                      </Typography>
                      {result.genres.length !== 0 ? (
                        <Box sx={{ flexGrow: 1 }}>
                          <Grid container spacing={2}>
                            <Grid item xs={4}>
                              <Item style={{ width: "fit-content" }}>
                                {result.genres[0]}
                              </Item>
                            </Grid>
                          </Grid>
                        </Box>
                      ) : null}
                    </CardContent>
                    <CardActions>
                      <Button
                        size="small"
                        onClick={() => handleFollowClick(result.id)}
                      >
                        Follow
                      </Button>
                      <Button size="small">Learn More</Button>
                    </CardActions>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>
        </div>
      ) : null}
    </div>
  );
}

export default SpotifySearch;
