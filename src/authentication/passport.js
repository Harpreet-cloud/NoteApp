import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local'; //importing Strategy from passport-local and renaming it to LocalStrategy
import { comparePassword } from './auth.js';
import User from "../models/userSchema.js";


//new is used to cerate an object for the class LocalStrategy
passport.use(new LocalStrategy(  async (username, password, done) => { //async callback function
    try {
      const user = await User.findOne({ username });
      if (!user) return done(null, false, { message: 'username doesn\'t exist' }); //if user is not found then return false and message
      //if user is found then check for password below

      const isMatch = await comparePassword(password, user.passwordHash); //if there is match calling comparepassword function to verify password
      if (!isMatch) return done(null, false, { message: 'Incorrect password.' });//if password is not matching then return false and message

      return done(null, user); //else return authenticated user
    } catch (err) { //if there is any other errors
      return done(err); //return error
    }
  }
));
passport.serializeUser((user, done) => { //this is used to store user id in session as user logs in
  done(null, user._id); //null means no error and user._id is the id of the user
});

passport.deserializeUser(async (_id, done) => { //once user is logged in then this function is called to get the user data from the database
  //this is used to get the user data from the database using user id
  try {
    const user = await User.findById(_id).select('username email fullName'); //selecting all the fields except passwordHash
    done(null, user); //null means no error and user is the user data
  } catch (err) {
    done(err); // if error then return error 
  }
});