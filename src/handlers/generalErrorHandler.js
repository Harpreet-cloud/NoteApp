

export const generalErrorHandler = (err, req, res, next) => {
  console.error('Error occurred:', err);
  res.status(500).render('error',{
    message: err.message || 'Something is broken',
  });
};
