/*
    this function is just to check if the server is up and runinng
*/
exports.ping = function(req, res) {
    res.send('pong');
};