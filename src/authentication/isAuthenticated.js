//middleware to verify if the user is authorized or not

//isAuthenticated function is available automatically in the request object as soon as session is created so no imports are required

export const isAuthenticated = (req, res, next) => {
console.log("I am being hit");
 console.log("Is authenticated?", req.isAuthenticated());
 console.log("req.session:", req.session);
console.log("req.user:", req.user);

  if (req.isAuthenticated()) {
    return next(); // User is logged in, allow access and run the next middleware or route handler
  }


req.session.returnTo = req.originalUrl;//this is important part to save original url to session to redirect to page after successfull login

  // Redirect or respond with error if not authenticated
  return res.render('login', {
    errors: { message: 'Please log in to continue.' },
    title:'login',
    formData:{}
  });
};
