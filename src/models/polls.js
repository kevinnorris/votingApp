import mongoose from 'mongoose';

const Poll = new mongoose.Schema({
  question: String,
  votes: [{
    user: String,
    answer: String,
  }],
  answers: [{
    answer: String,
    voteCount: Number,
  }],
  totalVotes: Number,
  author: String,
  date: Date,
});

module.exports = mongoose.model('Poll', Poll);
