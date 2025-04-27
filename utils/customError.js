class CustomError extends Error {
    constructor(_message, _statusCode) {
        super(_message);
        this.statusCode = _statusCode || 500;
        Error.captureStackTrace(this, this.constructor);
    }
}

export default CustomError;