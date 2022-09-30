const router = require('express').Router();

const usersRoutes = require('./users');
const moviesRoutes = require('./movies');
const { createUser, login, logout } = require('../controllers/users');
const auth = require('../middlewares/auth');
const { createUserValidation, LoginValidation } = require('../middlewares/validation');
const NotFoundError = require('../errors/NotFoundError');

router.post('/signup', createUserValidation, createUser);
router.post('/signin', LoginValidation, login);

router.use(auth);

router.use(usersRoutes);
router.use(moviesRoutes);
router.post('/signout', logout);

router.use((req, res, next) => {
  next(new NotFoundError('Запрашиваемый ресурс не найден'));
});

module.exports = router;
