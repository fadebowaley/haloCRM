/*
This file handles user authentication using JSON Web Tokens (JWT). Here's what it does:

1. Token Extraction:
   Gets the JWT from the Authorization header in requests
   Example: Authorization: Bearer eyJhbGciOiJIUzI1NiIs...

2. Token Verification:
   - Checks if the token is valid using a secret key
   - Verifies it's an access token (not a refresh token)
   Example token payload:
   {
     "sub": "user123",
     "type": "access",
     "iat": 1516239022
   }

3. User Lookup:
   - Uses the user ID from the token to find the user in database
   Example:
   Token contains user ID "user123"
   Looks up user in database with that ID

4. Authentication Result:
   - Success: Provides the user object to the route
   - Failure: Returns unauthorized error
   Example usage in routes:
   app.get('/profile', passport.authenticate('jwt'), (req, res) => {
     // req.user contains the authenticated user
   });
*/

const { Strategy: JwtStrategy, ExtractJwt } = require('passport-jwt');
const config = require('./config');
const { tokenTypes } = require('./tokens');
const { User } = require('../models');

const jwtOptions = {
  secretOrKey: config.jwt.secret,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
};

const jwtVerify = async (payload, done) => {
  try {
    if (payload.type !== tokenTypes.ACCESS) {
      throw new Error('Invalid token type');
    }
    const user = await User.findById(payload.sub);
    if (!user) {
      return done(null, false);
    }
    done(null, user);
  } catch (error) {
    done(error, false);
  }
};

const jwtStrategy = new JwtStrategy(jwtOptions, jwtVerify);

module.exports = {
  jwtStrategy,
};
