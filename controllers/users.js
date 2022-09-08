const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/user');

const getUser = (req, res) => {
  User.findById(req.params.userId)
    .then((user) => res.send(user))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
};

const updateUser = (req, res) => {
  const { name, email } = req.body;
  const userId = req.user._id;

  User.findByIdAndUpdate(userId, { name, email }, { new: true, runValidators: true })
    .then((user) => res.send(user))
    .catch((err) => res.status(500).send({ message: err }));
};

const createUser = (req, res, next) => {
  const { email, password, name } = req.body;

  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name, email, password: hash,
    }))
    .then((user) => res.send({
      name: user.name, email: user.email,
    }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new Error('Переданы некорректные данные при создании пользователя.'));
      } else if (err.name === 'MongoError' || err.code === 11000) {
        next(new Error(('Пользователь с таким email уже существует.')));
      } else {
        next(err);
      }
    });
};

const login = (req, res) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        'some-secret-key',
        { expiresIn: '7d' },
      );

      res.cookie('jwt', token, {
        maxAge: 3600000 * 24 * 7,
        httpOnly: true,
      })
        .send({ token });
    })
    .catch(() => res.status(400).send({ message: 'Неправильные почта или пароль.' }));
};

const logout = (req, res) => {
  res.clearCookie('jwt').send({ message: 'Вы успешно вышли.' });
};

module.exports = {
  getUser,
  updateUser,
  createUser,
  login,
  logout,
};
