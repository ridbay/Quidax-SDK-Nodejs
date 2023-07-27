// import util from "util"

class BaseError extends Error {
    status: any

    /**
     * The BaseError Constructor.
     * @param {Object} options - A configuration object for errors.
     * @param {String} options.message - The error message if any.
     * @constructor BaseError
     */
    constructor(options:any = {}) {
        super(options.message)
        
        // Error.captureStackTrace(this, this.constructor)
        // new Error.captureStackTrace(this, this.constructor)
        this.name = this.constructor.name
        this.message = options.message
        this.status = options.status
        Object.setPrototypeOf(this, new.target.prototype);
    }
}

export default BaseError