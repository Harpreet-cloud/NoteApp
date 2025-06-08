// import jwt from "jsonwebtoken";

import bcrypt from 'bcryptjs';
import passport from 'passport';
import { validationResult } from 'express-validator';

//not needed anymore as doing passport authentication
// //using to create token
// const createJWT = ({ email, username }) => {
//   const token = jwt.sign(
//     { email, username },
//     process.env.JWT_SECRET,
//     { expiresIn: '1h' }
//   );
//   return token;
// };
// //protection of routes 

// const protect = (req, res, next) => {
//   const bearer = req.headers.authorization;

//   // Check if the authorization header is provided
//   if (!bearer) {
//     return res.status(401).json({ message: "Not authorized, no token provided" });
//   }

//   // Extract the token from the authorization header
//   const [, token] = bearer.split(" ");

//   // Check if the token is valid
//   if (!token) {
//     return res.status(401).json({ message: "Not valid token" });
//   }

//   try {
//     // Verify the token
//     const payload = jwt.verify(token, process.env.JWT_SECRET);
//     req.user = payload; // Add the user info to the request object
//     return next(); // Proceed to the next middleware or route handler
//   } catch (error) {
//     console.error('JWT verification error:', error);
//     return res.status(401).json({ message: "Token malformed or expired" });
//   }
// };




//this is to create a hash of the password


const hashPassword = async (password) => {
  const saltRounds = 7;
  const salt = await bcrypt.genSalt(saltRounds);
  const hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
};

//this is to compare the password with the hashed password

const comparePassword = async (password, hash) => {
  const isMatch = await bcrypt.compare(password, hash);//compare the password with the hash
  console.log(isMatch); 
  return isMatch;
};

// authMiddleware.js


const localAuth = (req, res, next) => {
  passport.authenticate('local', (err, user, info) => { //local is LocalStatergy defined in passport.js
    console.log(req.user);
    if (err) return next(err); //this will call general error handler for other errors
    if (!user) {
      return res.render('login', {
        title:'login',
        errors: { message: info.message}, //this will display error messages as per passport.js
        formData: req.body
      });
    }
    req.logIn(user, (err) => {
      if (err) return next(err);
      return res.redirect('/add');
    });
  })(req, res, next); // Execute the middleware
};



export {
  hashPassword,
  comparePassword,
  localAuth
};