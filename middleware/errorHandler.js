const errorHandler = (err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message;

    res.status(statusCode).json({
        success: false,
        message: message,
        statck: process.env.NODE_ENV == 'DEV' ? err.statck : undefined
    })
}

export default errorHandler;