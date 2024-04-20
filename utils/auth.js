const withAuth = (req, res, next) => {

    if (!req.session.logged_in) {
      res.render('home', {home: true});
    } else {
      next();
    }
  };
  
  module.exports = withAuth;