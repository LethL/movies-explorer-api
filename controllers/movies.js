const Movie = require('../models/movie');

const getMovies = (req, res) => {
  Movie.find({})
    .then((movies) => res.send(movies))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
};

const createMovie = (req, res) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    nameRU,
    nameEN,
    movieId,
  } = req.body;
  const owner = req.user._id;

  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
    owner,
  })
    .then((movie) => res.send(movie))
    .catch((err) => res.status(500).send({ message: err }));
};

const deleteMovie = (req, res) => {
  Movie.findByIdAndRemove(req.params.id)
    .then((movie) => {
      if (!movie) {
        res.status(404).send({ message: 'not found movie' });
      } else {
        res.send(movie);
      }
    })
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
};

module.exports = { getMovies, createMovie, deleteMovie };
