const AppError = require('../utilis/AppError');

const handleCastErrorDB = err => {
    const message = `Invalid ${err.path}: ${err.value}.`;
    return new AppError(message, 400);
};
const handleFileNotFound = err => {
    const message = `File Not Found ! Please try again later...`;
    return new AppError(message, 400);
};

const handleDuplicateFieldsDB = err => {
    const value = err.errmsg.match(/(["'])(\\?.)*?\1/)[0];

    const message = `Duplicate field value: ${value}. Please use another value!`;
    return new AppError(message, 400);
};
const handleMulterExceedLimit = err => {
    const message = `Unexpected Image(s) ! Please Try again later..`;
    return new AppError(message, 400);
};
 
const handleImageSupport = err => {
    const value = err.errmsg.match(/(["'])(\\?.)*?\1/)[0];
    const filetypes = /jpeg|jpg|png/;
    const message = "Error: File upload only supports the following filetypes - " + filetypes;
    return new AppError(message, 400);
};
const handleValidationErrorDB = err => {
    const errors = Object.values(err.errors).map(el => el.message);

    const message = `Invalid input data. ${errors.join('. ')}`;
    return new AppError(message, 400);
};
const handleConstraintErrorDB = err => {
    const errors = Object.values(err.errors).map(el => el.message);

    const message = `Invalid input data. ${errors.join('. ')}`;
    return new AppError(message, 400);
};
const handleJWTError = () =>
    new AppError('Invalid token. Please log in again!', 401);

const handleJWTExpiredError = () =>
    new AppError('Your token has expired! Please log in again.', 401);

const sendErrorDev = (err, req, res) => {

    // A) API
    if (req.originalUrl.startsWith('/api')) {
        console.log(req.originalUrl);
        return res.status(err.statusCode).json({
            status: err.status,
            error: err,
            message: err.message,
            stack: err.stack
        });
    }

};

const sendErrorProd = (err, req, res) => {
    // A) API
 
    if (req.originalUrl.startsWith('/api')) {
 
        // A) Operational, trusted error: send message to client
        if (err.isOperational) {
            return res.status(err.statusCode).json({
                status: err.status,
                message: err.message,
                statusCode: err.statusCode
            });
        }
        // B) Programming or other unknown error: don't leak error details
        // 1) Log error
        console.error('ERROR 💥', err);
        // 2) Send generic message
        return res.status(500).json({
            status: 'error',
            message: 'Something went very wrong!'
        });
    }


};

module.exports = (err, req, res, next) => {
  
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error';

    if (process.env.NODE_ENV === 'development') {
        sendErrorDev(err, req, res);
    } else if (process.env.NODE_ENV === 'production') {
        let error = {
            ...err
        };
        
        error.message = err.message;
        console.log(err);
        if (error.name === 'CastError') error = handleCastErrorDB(error);
        if (error.code === 11000) error = handleDuplicateFieldsDB(error);
        if (error.name === 'SequelizeValidationError' || error.name === 'AggregateError') error = handleValidationErrorDB(error);

        if (error.name === 'SequelizeUniqueConstraintError') error = handleConstraintErrorDB(error);
        if (error.errno === -4058) error = handleFileNotFound(error);
     
        if (error.name === 'JsonWebTokenError') error = handleJWTError();
        if (error.name === 'TokenExpiredError') error = handleJWTExpiredError();
        if (error.name === 'MulterError' && err.code == 'LIMIT_UNEXPECTED_FILE') error = handleMulterExceedLimit();
        sendErrorProd(error, req, res);
    }
};