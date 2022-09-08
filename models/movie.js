const mongoose = require('mongoose');
const validator = require('validator');

const linkRegExp = /^((https?):\/\/(www\.)?(([\w-]{1,})(\.))+([a-z]{2,10})([\w\W]{1,})?)$/i;

const movieSchema = new mongoose.Schema({
  country: {
    type: String,
    required: true,
  },
  director: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  year: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
    validate: {
      validator(link) {
        return linkRegExp.test(link);
      },
      message: 'Передайте ссылку.',
    },
  },
  trailerLink: {
    type: String,
    required: true,
    validate: {
      validator(link) {
        return linkRegExp.test(link);
      },
      message: 'Передайте ссылку.',
    },
  },
  thumbnail: {
    type: String,
    required: true,
    validate: {
      validator(link) {
        return linkRegExp.test(link);
      },
      message: 'Передайте ссылку.',
    },
  },
  owner: {
    type: mongoose.ObjectId,
    required: true,
    ref: 'user',
  },
  movieId: {
    type: Number,
    required: true,
    ref: 'movie',
    unique: true,
  },
  nameRU: {
    type: String,
    required: true,
  },
  nameEN: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('movie', movieSchema);
