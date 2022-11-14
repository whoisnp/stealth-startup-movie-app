const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const movieController = require('../controllers/movieController');

// get list of movies for a user
router.get('/listMovies/:uid', auth, movieController.getAllMovies);
// add movies
router.post('/addMovies', auth, movieController.addMovie);
// get movie by ID
router.get('/:mid', auth, movieController.getMovieById);
// delete movie by ID
router.delete('/:mid', auth, movieController.deleteMovieById);
// update movie by ID
router.put('/updateMovie/:mid', auth, movieController.updateMovie);

module.exports = router;