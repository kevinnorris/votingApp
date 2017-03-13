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
});

module.exports = mongoose.model('User', User);
