require("dotenv").config();
const express = require("express");
const queryString = require("querystring");
const axios = require("axios");
const PORT = 4000;
const app = express();
const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REDIRECT_URI = process.env.REDIRECT_URI;
const cors = require("cors");
const bodyParser = require("body-parser");
const crypto = require("crypto");
const request = require("request");
const wikiEndpoint = "https://en.wikipedia.org/w/api.php?";
const params = {
  origin: "*",
  format: "json",
  action: "query",
  list: "search",
  prop: "info",
  inprop: "url",
  exchars: 250,
  exintro: true,
  explaintext: true,
  gsrlimit: 5,
};

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const redis = require("redis");
const client = redis.createClient();

client.on("error", function (error) {
  console.error(error);
});

app.post("/", (req, res) => {
  res.json(req.body);
});

// program to generate random strings
// declare all characters

const generateString = (length) => {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = " ";
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }

  return result;
};

const stateKey = "spotify_auth_state";

app.get("/login", (req, res) => {
  const state = generateString(16);
  res.cookie(stateKey, state);

  const scope = "user-read-private user-read-email";
  const queryParams = queryString.stringify({
    client_id: CLIENT_ID,
    response_type: "code",
    redirect_uri: REDIRECT_URI,
    state: state,
    scope: scope,
  });
  res.redirect(`https://accounts.spotify.com/authorize?${queryParams}`);
});

app.get("/callback", (req, res) => {
  const code = req.query.code || null;

  axios({
    method: "post",
    url: "https://accounts.spotify.com/api/token",
    data: queryString.stringify({
      grant_type: "authorization_code",
      code: code,
      redirect_uri: REDIRECT_URI,
    }),
    headers: {
      "content-type": "application/x-www-form-urlencoded",
      Authorization: `Basic ${new Buffer.from(
        `${CLIENT_ID}:${CLIENT_SECRET}`
      ).toString("base64")}`,
    },
  })
    .then((response) => {
      if (response.status === 200) {
        const { access_token, token_type } = response.data;

        axios
          .get("https://api.spotify.com/v1/search?q=Selena&type=artist", {
            headers: {
              Authorization: `${token_type} ${access_token}`,
            },
          })
          .then((response) => {
            if (response.status === 200) {
              res.send(`<pre>${JSON.stringify(response.data, null, 2)}<pre>`);
            } else {
              res.send(response);
            }
          })
          .catch((error) => {
            res.send(error);
          });
      } else {
        res.send(response);
      }
    })
    .catch((error) => {
      res.send(error);
    });
});

app.get("/refresh_token", (req, res) => {
  const { refresh_token } = req.query;

  axios({
    method: "post",
    url: "https://accounts.spotify.com/api/token",
    data: queryString.stringify({
      grant_type: "refresh_token",
      refresh_token: refresh_token,
    }),
    headers: {
      "content-type": "application/x-www-form-urlencoded",
      Authorization: `Basic ${new Buffer.from(
        `${CLIENT_ID}:${CLIENT_SECRET}`
      ).toString("base64")}`,
    },
  })
    .then((response) => {
      if (response.status === 200) {
        res.send(`<pre>${JSON.stringify(response.data, null, 2)}<pre>`);
      } else {
        res.send(response);
      }
    })
    .catch((error) => {
      res.send(error);
    });
});

app.get("/wikipedia", (req, res) => {
  const search = req.query.artistName;
  params.srsearch = search;
  console.log(params);
  axios
    .get(wikiEndpoint, { params })
    .then((response) => {
      res.json(response.data);
    })
    .catch((error) => {
      res.send(error);
    });
});

// search port
app.get("/search", (req, res) => {
  // get the AccessTokenHash
});
app.get("/setcookie", function (req, res) {
  // Setting a cookie with key 'my_cookie'
  // and value 'geeksforgeeks'
  res.cookie("my_cookie", "geeksforgeeks");
  res.send("Cookies added");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
