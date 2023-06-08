const express = require('express');
const router = express.Router();
const {
  getAllMovies,
  createMovies,
  deleteMovie,
  updateMovie,
} = require('../controllers/movies');
const authenticateUser = require('../middleware/authentication');
const authorizeUser = require('../middleware/authorization');

router
  .route('/')
  .get(authenticateUser, getAllMovies)
  .post([authenticateUser, authorizeUser], createMovies);

router
  .route('/:id')
  .delete([authenticateUser, authorizeUser], deleteMovie)
  .patch([authenticateUser, authorizeUser], updateMovie);

module.exports = router;
