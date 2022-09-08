const router = require('express').Router();
const { getMovies, createMovie, deleteMovie } = require('../controllers/movies');
const { moviesValidation, idValidation } = require('../middlewares/validation');

router.get('/movies', getMovies);

router.post('/movies', moviesValidation, createMovie);

router.delete('/movies/:_id', idValidation, deleteMovie);

module.exports = router;
