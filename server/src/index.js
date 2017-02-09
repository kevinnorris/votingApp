import path from 'path';
import express from 'express';
import mongoose from 'mongoose';
import passport from 'passport';
import bodyParser from 'body-parser';
import jwt from 'jsonwebtoken';
import popupTools from 'popup-tools';

import User from './models/users';

const app = express();
require('dotenv').load();
require('./config/passport')(passport);

mongoose.connect(process.env.MONGO_URI);
mongoose.Promise = global.Promise;

// add body parsing
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({extended: true})); // for parsing application/x-www-form-urlencoded

// add passport.js
app.use(passport.initialize());

// set static files path
app.use(express.static(path.resolve('../client/dist')));

/*
  Token verification middleware
  ----------------------
*/
const tokenVerify = (req, res, next) => {
  console.log('querys: ', req.query);
  // check header or url params or post params for token
  const token = req.body.token || req.query.token || req.headers['x-access-token'];
  // console.log(req.headers);

  // decode token
  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.json({success: false, message: 'Failed to authenticate token.'});
      }
      // if all is well, save to request fo use in other routes
      req.decoded = decoded;
      return next();
    });
  } else {
    // no token
    return res.status(403).json({success: false, message: 'No token provided.'});
  }
};

/*
  Github authentication
  ------------------------
*/
app.route('/auth/github')
  .get(passport.authenticate('github'));

app.route('/auth/github/callback')
  .get(passport.authenticate('github'), (req, res) => {
    if (!req.user) {
      return res.json({success: false, message: 'Github authentication error.'});
    }
    // Create and send json web token
    const token = jwt.sign({
      sub: req.user.github.id,
      iss: process.env.APP_URL,
      iat: (new Date().getTime()),
    }, process.env.JWT_SECRET, {
      expiresIn: '4h',
    });

    return res.end(popupTools.popupResponse({
      success: true,
      token,
      user: req.user,
    }));
  });

/*
  API routes
  ------------------------
*/
const apiRoutes = express.Router();

apiRoutes.get('/users', tokenVerify, (req, res) => {
  User.find({}, (err, users) => {
    if (err) {
      console.log('error with User.find');
      throw err;
    }
    res.json({success: true, data: users});
  });
});

apiRoutes.get('/addClick', tokenVerify, (req, res) => {
  // Update the number of clicks by 1 for the given user
  User.update(
    {_id: req.query.id},
    {$inc: {'nbrClicks.clicks': 1}},
    (err) => {
      if (err) {
        console.log('error in updating: ', err);
        return res.json({success: false, message: err.message});
      }
      console.log('click update successful');
      return res.json({success: true});
    },
  );
});

apiRoutes.get('/getClicks', tokenVerify, (req, res) => {
  User.findById(req.query.id, (err, user) => {
    if (err) {
      return res.json({success: false, message: err.message});
    }
    return res.json({success: true, clicks: user.nbrClicks.clicks});
  });
});

app.use('/api', apiRoutes);

/*
  Generic routes
  ------------------------
*/
app.get('/*', (req, res) => {
  res.status(200).sendFile(path.resolve('../client/dist/index.html'));
});

// Start express server
app.listen(process.env.PORT || 8080);
