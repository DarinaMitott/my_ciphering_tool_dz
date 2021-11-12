
class InvalidArgumentError extends Error {
    constructor(message) {
        super(message);
        this.name = 'InvalidArgumentError';
    }
}

class InvalidConfigError extends Error {
    constructor(message) {
        super(message);
        this.name = 'InvalidConfigError';
    }
}

module.exports = {
    InvalidArgumentError,
    InvalidConfigError,
}