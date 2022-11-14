/*
 This Middleware checks if the user session is valid or not if not it would send the user to loginScreen
 */
module.exports = {
    ensureAuthenticated: (req, res, next) => {
      // console.log('req.session.user.uid : ' + req.session.user.uid)
      
      if (req.session.user.uid) {
        return next();
      } else {
        const alerts = [];
        alerts.push({ msg: "You need to login first." });
        res.render("login", {
          alerts,
        });
      }
    },
  };
  