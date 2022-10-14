const express = require('express');
const bodyParser = require('body-parser');
const uuid = require('uuid');
const spotifyRoutes = require('./routes/spotify-routes');

const app = express();

app.use(bodyParser.json());

app.use('/api/spotify', spotifyRoutes);

app.use((err, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }

  res.status(500).json('An unknown error occurred!');
});

app.listen(4000);