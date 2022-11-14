const express = require("express");
const router = express.Router();
const axios = require("axios");
const { ensureAuthenticated } = require("../config/auth");
const service = require("../config/service");

router.use(ensureAuthenticated);

// home page where the movies are listed
router.get("/", (req, res) => {
    let uid = req.session.user.uid;
    let alerts = [];
    axios.get(`${service.backend.host}:${service.backend.port}${service.backend.getAllMovies}/${req.session.uid}`,service.headers)
        .then((response) => checkStatus(response))
        .then((data) => {
            let movies = data.data[0].movies
            res.render("home", {
                movies,
            });
        })
        .catch((err) => {
            alerts.push({ msg: "Could'nt load your movies" });

            res.render("home", {
                alerts,
            });
        });
});

// add Movies page
router.get("/addMovie", (req, res) => {
    res.render("addMovies");
});

// Add Movies Post API call 
router.post("/movie", (req, res) => {
    let uid = req.session.user.uid;
    let { name, cast, genre, releaseDate, rating } = req.body;
    let alerts = [];

    let castArray = []
    let castNames = cast.split(',')
    castNames.forEach(element => {
        castArray.push(element)
    });
    let movie = {
        movieName: name,
        cast: castArray,
        genre: genre,
        releaseDate: releaseDate,
        rating: rating,
        userUid: uid,
    };

    if (!uid | !name | !cast | !genre | !releaseDate | !rating) {
        alerts.push({ msg: "Enter all fields" });

        res.render("addMovies", {
            movie,
            alerts,
        });
    } else {
        axios.post(`${service.backend.host}:${service.backend.port}${service.backend.addMovies}`, movie,service.headers)
            .then((response) => checkStatus(response))
            .then((movie) => {
                alerts.push({ msg: "Movie added" });

                res.render("addMovies", {
                    alerts,
                });
            })
            .catch((err) => {
                alerts.push({ msg: "Could'nt add your movie" });

                console.log(err);
                res.render("addMovie", {
                    movie,
                    alerts,
                });
            });
    }
});

// get Sinlge Movie
router.get("/movie/:mid", (req, res) => {
    let mid = req.params.mid;
    let alerts = [];
    axios.get(`${service.backend.host}:${service.backend.port}${service.backend.getSingleMovie}/${mid}`,service.headers)
        .then((response) => checkStatus(response))
        .then((data) => {
            let movie = data.data
            res.render("editMovies", {
                movie,
            });
        })
        .catch((err) => {
            alerts.push({ msg: "Could'nt load your movie" });

            console.log(err);
            res.render("editMovies", {
                alerts,
            });
        });
});

// delete API call
router.get("/movie/del/:mid", (req, res) => {
    let mid = req.params.mid;
    let alerts = [];

    axios.delete(`${service.backend.host}:${service.backend.port}${service.backend.deleteSingleMovie}/${mid}`,service.headers)
        .then((response) => checkStatus(response))
        .then(() => {
            res.redirect("/movies");
        })
        .catch((err) => {
            alerts.push({ msg: "Could'nt delete your movie" });

            console.log(err);
            res.render("editMovies", {
                movie,
                alerts,
            });
        });
});

// update  movive POST call
router.post("/movie/:mid", (req, res) => {
    let uid = req.session.user.uid;
    let mid = req.params.mid;
    let { name, cast, genre, releaseDate, rating } = req.body;

    let alerts = [];

    let castArray = []
    let castNames = cast.split(',')
    castNames.forEach(element => {
        castArray.push(element)
    });
    let movie = {
        id: mid,
        movieName: name,
        cast: castArray,
        genre: genre,
        releaseDate: releaseDate,
        rating: rating,
        userUid: uid,
    };
    if (!uid | !name | !cast | !genre | !releaseDate | !rating) {
        alerts.push({ msg: "Enter all fields" });

        res.render("editMovies", {
            movie,
            alerts,
        });
    } else {
        axios.put(`${service.backend.host}:${service.backend.port}${service.backend.updateMovie}/${mid}`, movie,service.headers)
            .then((response) => checkStatus(response))
            .then(() => {
                res.render("editMovies", {
                    movie,
                    alerts,
                });
            })
            .catch((err) => {
                alerts.push({ msg: "Could'nt update your movies" });

                console.log(err);
                res.render("editMovies", {
                    movie,
                    alerts,
                });
            });
    }
});

// check status of the API calls made
function checkStatus(res) {
    if (res.status >= 200 && res.status < 300) {
        return res;
    } else {
        throw new Error();
    }
}

module.exports = router;
