const cookieParser = require("cookie-parser");
const uuid = require("uuid");
const query = require("query-string");
const axios = require("axios");

const clientId = process.env.SPOTIFY_CLIENT_ID;
const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
const redirect_uri = "http://localhost:3000/";
const showsUrl =
  "https://api.spotify.com/v1/shows/173jVGeywfKnIW9mp6gG71/episodes?limit=3";

const stateKey = "spotify_auth_state";
const state = uuid.v4();

const getSpotifyClientParams = (req, res) => {
  console.log(process.env.SPOTIFY_CLIENT_ID);
  res.cookie(state, stateKey, { sameSite: 'None', secure: true});

  res.status(200).json({
    response_type: "code",
    client_id: clientId,
    redirect_uri: redirect_uri,
    state: state,
    scope: "user-top-read",
  });
};

const getSpotifyAccessToken = async (req, res) => {
  const requestParams = {
    grant_type: "authorization_code",
    code: req.body.code,
    redirect_uri: redirect_uri,
  };

  const authCode = Buffer.from(clientId + ":" + clientSecret).toString(
    "base64"
  );

  const spotifyResponse = await axios.post(
    "https://accounts.spotify.com/api/token",
    query.stringify(requestParams),
    {
      headers: {
        Authorization: "Basic " + authCode,
        "Content-Type": "application/x-www-form-urlencoded",
        Cookie: 'SameSite=None; Secure'
      },
    }
  );

  res.status(201).json(spotifyResponse.data);
};

const getSpotifyShows = async (req, res) => {
  const shows = await axios.get(showsUrl, {
    headers: {
      Authorization: "Bearer " + req.body.accessToken,
      Cookie: 'SameSite=None; Secure'
    },
  });

  res.status(200).json({ shows: shows.data });
};

exports.getSpotifyClientParams = getSpotifyClientParams;
exports.getSpotifyAccessToken = getSpotifyAccessToken;
exports.getSpotifyShows = getSpotifyShows;
