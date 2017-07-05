const AuthenticationController = require('./controllers/authentication');
const express = require('express');
const passportService = require('./config/passport');
const passport = require('passport');
const passportTwitch = require('./auth/twitch');
// Middleware to require login/auth
const requireAuth = passport.authenticate('jwt', {session: false});
const requireLogin = passport.authenticate('local', {session: false});

// Constants for role types
const REQUIRE_ADMIN = 'Admin';
const REQUIRE_OWNER = 'Owner';
const REQUIRE_CLIENT = 'Client';
const REQUIRE_MEMBER = 'Member';

module.exports = app => {
  // Initializing route groups
  const apiRoutes = express.Router();
  const authRoutes = express.Router();

  //=========================
  // Auth Routes
  // EXAMPLE: http://localhost:3000/api/auth/register
  //=========================

  // Set auth routes as subgroup/middleware to apiRoutes
  apiRoutes.use('/auth', authRoutes);

  // Registration route
  authRoutes.post('/register', AuthenticationController.register);

  // Login route
  authRoutes.post('/login', requireLogin, AuthenticationController.login);

  // PASSPORT LOGIN TWITCH
  authRoutes.get('/twitch', passportTwitch.authenticate('twitch', {scope: ['user_read']}));

  authRoutes.get('/twitch/callback', (req, res) => {
    console.log(req, res, 'infooooo');
    res.send(`
<html>
  <head></head>
  <script>
    try {
      console.log(window.location.hash, 'hash');

    } catch(err) {
      console.error(err);
    }
  </script>
</html>
`);
  });

  // Test protected route
  apiRoutes.get('/protected', requireAuth, (req, res) => {
    res.send({content: 'The protected test route is functional!'});
  });

  // apiRoutes.get(
  //   '/admins-only',
  //   requireAuth,
  //   AuthenticationController.roleAuthorization('Admin'),
  //   (req, res) => {
  //     res.send({content: 'Admin dashboard is working.'});
  //   }
  // );

  // Set url for API group routes
  app.use('/api', apiRoutes);
};
