module.exports = (sequelize, Sequelize) => {
    const Movies = sequelize.define("movies", {
        movieName: {
            type: Sequelize.STRING,
        },
        rating: {
            type: Sequelize.INTEGER,
        },
        cast: {
            type: Sequelize.JSON,
        },
        genre: {
            type: Sequelize.STRING,
        },
        releaseDate: {
            type: Sequelize.DATE,
        },
    });
    return Movies;
};