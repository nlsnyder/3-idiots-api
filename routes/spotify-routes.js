const express = require('express');
const spotifyController = require('../controllers/spotify-controller');

const router = express.Router();

router.get('/', spotifyController.getSpotifyAuth);

module.exports = router;