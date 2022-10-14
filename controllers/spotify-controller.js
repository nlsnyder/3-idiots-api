const express = require('express');
const cookieParser = require('cookie-parser');
const uuid = require('uuid');
const query = require('query-string');

const clientId = 'b3b64a6e2d8b4c4796620f129cc84bb4';
const clientSecret = 'a9e42ba1c2c8436eb387626360c962f9';
const redirect_uri = 'http://localhost:3000/';

const stateKey = 'spotify_auth_state';
const state = uuid.v4();

const getSpotifyAuth = (req, res, next) => {
  res.cookie(state, stateKey);

  res.redirect('https://accounts.spotify.com/authorize?' +
    query.stringify({
      response_type: 'code',
      client_id: clientId,
      redirect_uri: redirect_uri,
      state: state
    }));

  res.status(200).json({stats: 'ok'});
};

exports.getSpotifyAuth = getSpotifyAuth;