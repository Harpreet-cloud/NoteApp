import User from "../models/userSchema.js";
import { hashPassword} from "../authentication/auth.js";

const createUser = async ({ username, email, password, fullName }) => {
  const existingUser = await User.findOne({ $or: [{ username }, { email }] });

  if (existingUser) {
    // Specific error messages for username and email
    if (existingUser.username === username) {
      throw new Error('Username already in use'); // this will throw an error which will be caught in userController.js
    }
    if (existingUser.email === email) {
      throw new Error('Email already in use');
    }
  }
  const hashedPassword = await hashPassword(password); //hashing the password using hashPassword function from auth.js

  const user = await User.create({ //creating new user
    username,
    email,
    fullName,
    passwordHash: hashedPassword, //this is storing hashed password in the database for a new user
  });

  return user;
};

export {
    createUser,
};