// npm packages
import {Strategy as GitHubStrategy} from 'passport-github2';
import {Strategy as GoogleStrategy} from 'passport-google-oauth20';

// our packages
import User from '../models/users';
import configAuth from './auth';

module.exports = (passport) => {
  // passportjs with oauth always requires sessions for the initial oauth handshake
  // the github strategy uses oauth thus sessions are required
  passport.serializeUser((user, done) => {
    done(null, user);
  });
  passport.deserializeUser((obj, done) => {
    done(null, obj);
  });

  // use GitHubStrategy
  passport.use(new GitHubStrategy({
    clientID: configAuth.githubAuth.clientID,
    clientSecret: configAuth.githubAuth.clientSecret,
    callbackURL: configAuth.githubAuth.callbackURL,
  },
  (token, refreshToken, profile, done) => {
    process.nextTick(() => {
      // Find user with matching github id
      User.findOne({'github.id': profile.id}, (err, user) => {
        if (err) {
          console.log('error getting data from github');
          return done(err);
        }
        // If user exists in our db return user
        if (user) {
          return done(null, user);
        }

        // Create new user
        const newUser = new User();
        newUser.name = profile.displayName;
        newUser.github.id = profile.id;
        newUser.github.username = profile.username;
        newUser.github.displayName = profile.displayName;
        newUser.github.publicRepos = profile._json.public_repos;
        newUser.google = null;

        // Save user to db
        newUser.save((e) => {
          if (e) {
            throw e;
          }
          return done(null, newUser);
        });
      });
    });
  }));

  // use GoogleStrategy
  passport.use(new GoogleStrategy({
    clientID: configAuth.googleAuth.clientID,
    clientSecret: configAuth.googleAuth.clientSecret,
    callbackURL: configAuth.googleAuth.callbackURL,
  },
  (token, refreshToken, profile, done) => {
    process.nextTick(() => {
      // Find user with matching google id
      User.findOne({'google.id': profile.id}, (err, user) => {
        if (err) {
          return done(err);
        }
        // If user exists in db
        if (user) {
          return done(null, user);
        }

        // Create new user
        const newUser = new User();
        newUser.name = profile.displayName;
        newUser.github = null;
        newUser.google.id = profile.id;
        newUser.google.displayName = profile.displayName;

        // Save user to db
        newUser.save((e) => {
          if (e) {
            throw e;
          }
          return done(null, newUser);
        });
      });
    });
  }));
};
