/* this is the placeholder where the user Token would be stored when creating a session 
 this could be reused everyplace the api is called 
 this also holds the external API call configs
*/
module.exports = {
    headers: {
        headers: {
            "x-access-token": ""
        },
    },
    backend: {
        host: process.env.BE_HOST,
        port: process.env.BE_PORT,
        getAllMovies: "/movies/listMovies",
        addMovies: "/movies/addMovies",
        getSingleMovie: "/movies",
        deleteSingleMovie: "/movies",
        updateMovie: "/movies/updateMovie",

        userRegistration:"/user/register",
        userLogin:"/user/login",
        profile:"/user"
    }
}