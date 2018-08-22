const LocalStrategy = require('passport-local').Strategy;
const { knex } = require('../database/db');
const bcrypt = require('bcryptjs');
const passport = require('passport');

passport.use(new LocalStrategy({
  usernameField: 'email'
},
  (email, password, done) => {
    knex('users')
      .select()
      .where({ email })
      .first()
      .then(user => {
        if (!user) {
          return done('User does not exist');
        }
        if (bcrypt.compareSync(password, user.password)) {
          return done(null, user);
        }
        return done('Invalid username or password');
      })
      .catch(err => done(err))
  }
));

passport.serializeUser((user, done) => {
  done(null, user.id)
});

passport.deserializeUser((id, done) => {
  knex('users')
    .select()
    .where({ id })
    .first()
    .then(user => {
      done(null, user);
    })
    .catch(err => done(err))
});

const loginHelper = (email, password, req) => {
  return new Promise((resolve, reject) => {
    passport.authenticate('local', (err, user) => {
      if (err) {
        reject(new Error(err));
      }
      req.login(user, () => {
        const { id, email, first_name, last_name, phone_number } = user;
        resolve({ id, email, first_name, last_name, phone_number });
      })
    })({ body: { email, password } });
  })
};

const signUpHelper = (email, password, first_name, last_name, phone_number, req) => {
  return knex('users')
    .select()
    .where({ email })
    .first()
    .then(user => {
      if (user) {
        throw new Error('User already exists');
      }
      return bcrypt.hash(password, 10)
        .then(hash => {
          return knex('users')
            .insert({ email, password: hash, first_name, last_name, phone_number });
        })
        .then(() => {
          return new Promise((resolve, reject) => {
            passport.authenticate('local', (err, user) => {
              if (err) {
                reject(new Error(err));
              }
              req.login(user, () => {
                const { id, email, first_name, last_name, phone_number } = user;
                resolve({ id, email, first_name, last_name, phone_number });
              })
            })({ body: { email, password } });
          })
        })
    })
    .catch(err => console.log(err))
};

module.exports = { passport, loginHelper, signUpHelper };