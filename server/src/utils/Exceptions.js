export class MongoDBConnectionError extends Error {
    constructor(message) {
        super(message);
        this.name = this.constructor.name;
        this.status = 500;
        Error.captureStackTrace(this, this.constructor);
    }
}

export class SongNameMissingError extends Error {
    constructor(message) {
        super(message);
        this.name = this.constructor.name;
        this.status = 400;
        Error.captureStackTrace(this, this.constructor);
    }
}

export class WebhookSendError extends Error {
    constructor(message) {
        super(message);
        this.name = this.constructor.name;
        this.status = 503;
        Error.captureStackTrace(this, this.constructor);
    }
}