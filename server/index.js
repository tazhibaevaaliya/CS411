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
const jwtConfig = {
  jwtSecret: "maggieD",
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

app.get("/loginRedirect", (req, res) => {
  res.redirect("http://localhost:4000/login");
});

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
      if (response.status !== 200) {
        res.send("There was an error!");
      } else {
        //get the access token from the response
        const { access_token, token_type } = response.data;
        console.log(response.data);
        //send API call to fetch the current user profile
        axios
          .get("https://api.spotify.com/v1/me", {
            headers: {
              Authorization: `${token_type} ${access_token}`,
            },
          })
          .then((profileResponse) => {
            if (profileResponse.status !== 200) {
              res.send("There was an error");
            } else {
              console.log(profileResponse.data);
              const { id } = profileResponse.data; //extract unique user id

              //try connecting to the Redis with aync function
              client
                .connect()
                .then(async (res) => {
                  console.log("connected");
                  client.set(id, access_token);
                  client.quit();
                })
                .catch((err) => {
                  console.log("err happened" + err);
                });

              res.cookie("isLoggedIn", true); //res = response to the browser / user
              res.cookie("userInformation", {
                token_type: token_type,
                id: id,
              });
              res.redirect("http://localhost:3000");
            }
          })
          .catch((error) => {
            res.send(error);
          });
        // res.redirect("http://localhost:3000");
      }
    })
    .catch((error) => {
      // res.redirect("http://localhost:3000");
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
app.get("/spotify", (req, res) => {
  const artistName = req.query.artistName;
  const cookieName = "isLoggedIn";
  // const { token_type, id } = req.cookies.cookieName;
  console.log(req.cookies);

  // //try connecting to the Redis with aync function
  // client
  //   .connect()
  //   .then(async (r) => {
  //     console.log("connected");
  //     client.get(id, function (err, reply) {
  //       if (!reply) {
  //       } else {
  //         const access_token = reply;
  //         axios
  //           .get(
  //             `https://api.spotify.com/v1/search?q=${artistName}&type=artist`,
  //             {
  //               headers: {
  //                 Authorization: `${token_type} ${access_token}`,
  //               },
  //             }
  //           )
  //           .then((response) => {
  //             if (response.status === 200) {
  //               res.json(response.data);
  //             } else {
  //               res.send(response);
  //             }
  //           })
  //           .catch((error) => {
  //             res.send(error);
  //           });
  //       }
  //     });
  //     client.quit();
  //   })
  //   .catch((err) => {
  //     console.log("err happened" + err);
  //   });
});

app.get("/logout", (req, res) => {
  res.clearCookie("isLoggedIn"); //res = response to the browser / user
  res.send("hello");
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
