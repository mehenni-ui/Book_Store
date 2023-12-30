const notFound = (req, res, next) => {
      const error = new Error("Book not found" + req.originalUrl);
      res.status(404);
      next(error);
}



const errorHandler = (err, req, res, next) => {
      const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
      console.error(err); // log the error for debugging purposes
    
      // Check if the error has a message, otherwise use a default message
      const errorMessage = err.message || 'Internal Server Error';

      res.status(statusCode).json({ mesaage: errorMessage });
}



module.exports ={
      notFound, errorHandler
}