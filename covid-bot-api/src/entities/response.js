const httpConstants = require('http2').constants;
const statusCodes = require('http').STATUS_CODES;

class Response {
    constructor(status, result) {
        this.status = status;
        this.result = result;
    }

    toHttpStatus() {
        return result.status === httpConstants.HTTP_STATUS_OK
            ? httpConstants.HTTP_STATUS_OK : httpConstants.HTTP_STATUS_INTERNAL_SERVER_ERROR;
    }

    toHttpStatusCode() {
        return statusCode(result.status === httpConstants.HTTP_STATUS_OK
            ? statusCodes[httpConstants.HTTP_STATUS_OK] : statusCodes[httpConstants.HTTP_STATUS_INTERNAL_SERVER_ERROR]);
    }
}

module.exports = Response;