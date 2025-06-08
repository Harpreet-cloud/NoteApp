import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    lowercase: true, //we need this to make sure username is always saved in lowercase
    minlength: 3, //minimum length of username is 3 characters
    unique: true, /// no duplicate username will be allowed
    trim: true, //this will remove the spaces from the start and end of the string
  },

  email: {
    type: String,
    required: true,
    unique: true, // no duplicate emails will be allowed
    lowercase: true, //we need this to make sure email is always saved in lowercase
    trim: true, 
    match: [/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, 'Please fill a valid email address']  //this will ensure that email is in correct format
  },

  passwordHash: {
    type: String,
    required: true,
    minlength: 6, //minimum length of password is 6 characters
  },

  fullName: {
    type: String,
    required: true,
    minlength: 3,
    lowercase: true, //we need this to make sure fullName is always saved in lowercase
    trim: true, //this will remove the spaces from the start and end of the string
  },

  notes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Note',
    }
  ]
}, {
  timestamps: true,
  versionKey: false,
});


export default mongoose.model('User', userSchema);