//this catchErrors 

export const catchErrors = (fn) => {
  return function (req, res, next) {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};

export const flashValidationErrors = (err, req, res, next) => {
  console.log(err);
  if (!err.errors) return next(err);
  const errorKeys = Object.keys(err.errors);
  console.log("my errorkeys: ", errorKeys);
  errorKeys.forEach((key) => req.flash("error", err.errors[key].message));
  res.redirect('/add');
};

