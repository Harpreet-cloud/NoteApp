
//this is used to destory the sessions

export const logoutHandler = (req, res, next) =>{
    console.log("hi,i am being called");
     console.log('Cookies received:', req.cookies);
  req.session.destroy(err => {
    if (err) {   // if there is any error then display that and also pass it to general error handler
      console.error('Logout error:', err);
      return next(err);
    }
    res.clearCookie(process.env.PASSPORT_COOKIE_KEY);  // clear the cookie matching your session key
    res.redirect('/');
  });
};