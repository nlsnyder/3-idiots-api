const express = require("express");
const spotifyController = require("../controllers/spotify-controller");

const router = express.Router();

router.get("/getClientParams", spotifyController.getSpotifyClientParams);

router.post("/accessToken", spotifyController.getSpotifyAccessToken);

router.post("/shows", spotifyController.getSpotifyShows);

module.exports = router;
