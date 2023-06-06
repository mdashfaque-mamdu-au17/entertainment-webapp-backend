const express = require('express');
const router = express.Router();
const {
  getAllMovies,
  createMovies,
  deleteMovie,
  updateMovie,
} = require('../controllers/movies');

router.route('/').get(getAllMovies).post(createMovies);

router.route('/:id').delete(deleteMovie).patch(updateMovie);

module.exports = router;
