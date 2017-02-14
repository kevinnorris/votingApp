import mongoose from 'mongoose';

const Poll = new mongoose.Schema({
  question: String,
  votes: [{
    user: String,
    answer: String,
  }],
  answers: Array,
  author: String,
  date: Date,
});

module.exports = mongoose.model('Poll', Poll);
