import { createUser } from '../handlers/userHandler.js';
// import { validationResult } from 'express-validator';

const createUserController = async (req, res) => {
  
  try {
   
    const { username, email, password, fullName } = req.body;

    // with data from reg.body we are creating a new user and calling createUser function from userHandler
    const user = await createUser({ username, email, password, fullName });

    // On successful registration, redirect to login
    res.redirect('/login'); 
  } catch (error) { //if there is other errors like duplicate username/email from createuser function

    const message = error.message || 'Registration failed';

    // Render the registration page with the error message and form data
    return res.render('register', {
      title:'Register',
      errors: { general: message },  // Pass a general error for username/email duplication and user variable general to differentiate it from validation errors
      formData: req.body  // Send the form data back to the template
    });
  }
};

export default {
  createUserController,
};
