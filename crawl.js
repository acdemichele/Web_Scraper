const normalizeURL = (input_URL)  => {
    if (!input_URL || typeof input_URL !== 'string') {
        throw new WrongParameterError();
    }

    const fullPath = new URL(input_URL.trim().toLowerCase());
    if (!fullPath.protocol || (fullPath.protocol !== 'http:' && fullPath.protocol !== 'https:')) {
        throw new WrongProtocolError();
    }

    if (!fullPath.pathname) {
        throw new InvalidPathname();
    }

    let return_url = `${fullPath.hostname}${fullPath.pathname}`;
    if (return_url.length > 0 && return_url.slice(-1) === '/') {
        return_url = return_url.slice(0, -1);
    }

    return return_url;
}
// Error handling classes
class InvalidPathname extends Error {
    constructor(message = 'Invalid Path') {
        super(message);
        this.name = this.constructor.name;
        this.message = message;
    }
}

class EmptyURLError extends Error {
    constructor(message = 'URL must be non-empty') {
        super(message);
        this.name = this.constructor.name;
        this.message = message;
    }
}

class WrongProtocolError extends Error {
    constructor(message = 'Incorrect Protocol used') {
        super(message);
        this.name = this.constructor.name;
        this.message = message;
    }
}

class WrongParameterError extends Error {
    constructor(message = 'URL must be of type String') {
        super(message);
        this.name = this.constructor.name;
        this.message = message;
    }
}

module.exports = {
    normalizeURL,
};
