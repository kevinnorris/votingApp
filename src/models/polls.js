import mongoose from 'mongoose';

const Poll = new mongoose.Schema({
  question: String,
  votes: [{
    user: String,
    answer: String,
  }],
  voteCount: Number,
  answers: Array,
  authorId: String,
  authorName: String,
  date: Date,
});

module.exports = mongoose.model('Poll', Poll);
