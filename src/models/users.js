import mongoose from 'mongoose';

const User = new mongoose.Schema({
  name: String,
  github: {
    id: String,
    displayName: String,
    username: String,
    publicRepos: Number,
  },
  google: {
    id: String,
    displayName: String,
  },
  nbrClicks: {
    clicks: Number,
  },
});

module.exports = mongoose.model('User', User);
