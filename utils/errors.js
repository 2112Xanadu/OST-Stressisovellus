'use strict';

// Source: https://github.com/patrick-ausderau/wop
// Not finished

const httpError = (message, status) => {
    const err = new Error(message);
    err.status = status;
    return err;
};

module.exports = {
    httpError,
}