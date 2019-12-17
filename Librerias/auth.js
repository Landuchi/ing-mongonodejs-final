const helpers = {};

helpers.isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  req.flash('fail_msg', 'No autorizado');
  res.redirect('/users/ingresar');
};

module.exports = helpers;
