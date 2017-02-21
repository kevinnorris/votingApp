import path from 'path';
import express from 'express';
import mongoose from 'mongoose';
import passport from 'passport';
import bodyParser from 'body-parser';
import jwt from 'jsonwebtoken';
import popupTools from 'popup-tools';

import User from './models/users';
import Poll from './models/polls';

const app = express();
require('dotenv').load();
require('./config/passport')(passport);

mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGO_URI);


// add body parsing
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({extended: true})); // for parsing application/x-www-form-urlencoded

// add passport.js
app.use(passport.initialize());

// set static files path
app.use(express.static(path.resolve('./client/public')));

/*
  Token verification middleware
  ----------------------
*/
const tokenVerify = (req, res, next) => {
  // check header or url params or post params for token
  const token = req.body.token || req.query.token || req.headers['x-access-token'];
  // console.log('token:', token, 'id: ', req.query.id);

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

// For debugging
apiRoutes.get('/getUsers', tokenVerify, (req, res) => {
  User.find({}, (err, users) => {
    if (err) {
      return res.json({success: false, message: err.message});
    }
    return res.json({success: true, users});
  });
});

apiRoutes.post('/savePoll', tokenVerify, (req, res) => {
  const newPoll = new Poll();
  newPoll.question = req.body.question;
  newPoll.votes = [];
  newPoll.voteCount = 0;
  newPoll.answers = req.body.answers.split(',');
  newPoll.author = req.body.author;
  newPoll.date = new Date();

  newPoll.save((e) => {
    if (e) {
      return res.json({success: false, error: e});
    }
    return res.json({success: true});
  });
});

apiRoutes.post('/deletePoll', tokenVerify, (req, res) => {
  Poll.findByIdAndRemove(req.body.pollId, (err, poll) => {
    if (err) {
      return res.json({success: false, message: err.message});
    }
    return res.json({success: true, poll});
  });
});

apiRoutes.post('/addAnswer', tokenVerify, (req, res) => {
  Poll.update(
    {_id: req.body.pollId},
    {$push: {
      answers: req.body.answer,
    }},
    (err) => {
      if (err) {
        return res.json({success: false, message: err.message});
      }
      return res.json({success: true});
    },
  );
});

/*
  Optional params:
    req.query.sortByVotes: string  'true' or 'false'
    req.query.ascending: string  'true' or 'false'
    req.query.activePage: string       number of active page
*/

const pollLimit = 10;
apiRoutes.get('/getPolls', (req, res) => {
  // Get num of polls
  Poll.count({}, (e, count) => {
    if (e) {
      return res.json({success: false, message: e.message});
    }
    const numOfPages = Math.ceil(count / pollLimit);

    let sortBy;
    if (req.query.sortByVotes === 'true') {
      sortBy = {voteCount: req.query.ascending === 'true' ? 1 : -1, _id: -1};
    } else {
      sortBy = {_id: req.query.ascending === 'true' ? 1 : -1, voteCount: -1};
    }

    if (req.query.activePage) {
      Poll.find().sort(sortBy).limit(pollLimit).skip(pollLimit * (req.query.activePage - 1))
        .exec((err, polls) => {
          if (err) {
            return res.json({success: false, message: err.message});
          }
          return res.json({success: true, polls, numOfPages});
        });
    } else {
      Poll.find().sort(sortBy).limit(pollLimit)
        .exec((err, polls) => {
          if (err) {
            return res.json({success: false, message: err.message});
          }
          return res.json({success: true, polls, numOfPages});
        });
    }
  });
});

apiRoutes.get('/getPoll', (req, res) => {
  Poll.findById(req.query.id, (err, poll) => {
    if (err) {
      return res.json({success: false, message: err.message});
    }
    return res.json({success: true, poll});
  });
});

apiRoutes.post('/vote', (req, res) => {
  console.log(req.body);
  Poll.update(
    {_id: req.body.pollId},
    {
      $push: {
        votes: {
          user: req.body.userId,
          answer: req.body.answer,
        },
      },
      $inc: {voteCount: 1},
    },
    (err) => {
      if (err) {
        return res.json({success: false, message: err.message});
      }
      return res.json({success: true});
    },
  );
});

// Test that both removes vote and decreases voteCount
apiRoutes.post('/removeVote', tokenVerify, (req, res) => {
  console.log(req.body);
  Poll.update(
    {_id: req.body.pollId},
    {
      $pull: {
        votes: {
          user: req.body.userId,
        },
      },
      $dec: {voteCount: 1},
    },
    {multi: false},
    (err) => {
      if (err) {
        return res.json({success: false, message: err.message});
      }
      return res.json({success: true});
    },
  );
});

app.use('/api', apiRoutes);

/*
  Generic routes
  ------------------------
*/
app.get('*', (req, res) => {
  res.status(200).sendFile(path.resolve('./client/public/index.html'));
});

// Start express server
app.listen(process.env.PORT || 8080);
