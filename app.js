const express = require('express');
const uuid = require('uuid');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const spotifyRoutes = require('./routes/spotify-routes');

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors());

app.use('/api/spotify', spotifyRoutes);

app.use((err, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }

  res.status(500).json('An unknown error occurred!');
});

app.listen(4000);