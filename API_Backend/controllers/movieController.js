/*
This controller is specifically for movies CRUD operations and it contains the following functions
getAllMovies -> get allmovies based on the userId(foreignKey)
updateMovie -> update Movies based on the movie ID
addMovie -> Insert new movies to the DB
getMovieById -> get a particular movie based on the movie ID
deleteMovieById => delete a movie based on the movie ID
*/

const logger = require("../config/logger")
const dbModel = require("../models");
const Movie = dbModel.movie;
const User = dbModel.user;

async function getAllMovies(req, res, next) {
    // include Movie to User which returns all the Movies of a user
    User.findAll({
        include: [{ model: Movie }],
    }).then((result) => {
        res.status(200).send(result)
    }).catch((err) => {
        logger.error(JSON.stringify(err))
        res.status(400).send(err)
    });
}

async function updateMovie(req, res, next) {
    // get movie ID
    let mid = req.params.mid

    // create the movie payload
    let movie = {
        movieName: req.body.movieName,
        cast: req.body.cast,
        genre: req.body.genre,
        releaseDate: req.body.releaseDate,
        rating: req.body.rating,
        userUid: req.body.userUid,
    };

    //update the Table
    Movie.update(movie, {
        where: {
            id: mid
        }
    })
        .then(data => {
            logger.info(`Movie Data Update for ID: ${mid}`)
            res.status(202).send(data);
        })
        .catch(err => {
            logger.error(JSON.stringify(err))
            res.status(400).send({
                message:
                    err.message || "Some error occurred while updating the Movie."
            });
        });
}

async function addMovie(req, res, next) {
    // payload to add Movie
    let movie = {
        movieName: req.body.movieName,
        cast: req.body.cast,
        genre: req.body.genre,
        releaseDate: req.body.releaseDate,
        rating: req.body.rating,
        userUid: req.body.userUid,
    };
    // Insert into Movie Table
    Movie.create(movie)
        .then(data => {
            logger.info(`New Movie Added for the user ${req.body.userUid}`)
            res.status(201).send(data);
        })
        .catch(err => {
            logger.error(JSON.stringify(err))
            res.status(400).send({
                message:
                    err.message || "Some error occurred while creating the Movie."
            });
        });
}

async function getMovieById(req, res, next) {
    // get the movie ID
    let mid = req.params.mid

    // find One from Movie table
    Movie.findOne({
        where: { id: mid }
    }).then((result) => {
        res.status(200).send(result)
    }).catch((err) => {
        res.status(400).send(err)
    });
}

async function deleteMovieById(req, res, next) {
    // get the Movie ID
    let mid = req.params.mid

    // delete the data from movie table
    Movie.destroy({
        where: { id: mid }
    }).then((result) => {
        logger.info(`Movie with id ${mid} has been deleted`)
        res.status(202).send(String(result))
    }).catch((err) => {
        logger.error(JSON.stringify(err))
        res.status(400).send(err)
    });
}

module.exports = { getAllMovies, addMovie, getMovieById, deleteMovieById, updateMovie };
