const passport= require ('passport');
const LocalStrategy = require('passport-local').Strategy;

const mongoose = require('mongoose');
const usuarios = require('../Models/user');

passport.use(new LocalStrategy({
  usernameField: 'correo'
}, async (correous, password, done) => {
  correous = correous.replace(/\s/g, '');
  const user = await usuarios.findOne({correo: correous});
  if (!user) {
    return done(null, false, { message: 'Usuario no encontrado' });
  } else {
    const match = await user.matchPassword(password);
    if(match) {
      return done(null, user);
    } else {
      return done(null, false, { message: 'Contraseña incorrecta' });

    }
  }
}));

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  usuarios.findById(id, (err, user) => {
    done(err, user);
  });
});
