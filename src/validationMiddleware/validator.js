import { body, validationResult } from 'express-validator';


  export const errorValidation  = (viewName,title='') => (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const customErrors = {}; //intialize an empty object to store errors

    // Use .map to loop through each error and fill the object
    errors.array().map(err => { //errors.array() will return an array of errors
      customErrors[err.path] = err.msg; //err.path will give the name of the field which has error
      // err.msg will give the error message
    });

    return res.render(viewName, {
      title,
      errors: customErrors, // Pass the errors to the EJS template
      formData: req.body // Pass the form data to the EJS template
    });
  }
  next();
};

  //validating user registration 
 
 
  export const validateUserRegistration = [
  body('username')
    .notEmpty().withMessage('Username is required').bail()
    .isLength({ min: 3 }).withMessage('Username must be at least 3 characters'),

body('email')
  .notEmpty().withMessage('Email is required')
  .bail()
  .isEmail().withMessage('Invalid email format'),

  body('password')
    .notEmpty().withMessage('Password is required').bail()
    .isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),

  body('fullName')
    .notEmpty().withMessage('Full name is required').bail()
    .isLength({ min: 3 }).withMessage('Full name must be at least 3 characters'),
 errorValidation('register','Register'),
];


// validating user login 

export const validateUserLogin = [
  body('username')
    .notEmpty().withMessage('Username is required'),

  body('password')
    .notEmpty().withMessage('Password is required'),
  errorValidation('login','Login'),
];



//validation on notes 

// export const validateNoteData = [
//   // Validate that 'title' and 'content' is provided and is a string,as these are reuired fields
//   body('title')
//     .notEmpty().withMessage('Title is required').bail()  //this can stop running further validtion if some errors are found in intial stage
//     .isString().withMessage('Title must be a string'), 
//   body('content')
//     .notEmpty().withMessage('Content is required').bail()
//     .isString().withMessage('Content must be a string'),

//  body('tags')
//   .isString().withMessage('Tags must be a string')
// ];


