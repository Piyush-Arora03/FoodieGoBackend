"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppError = void 0;
class AppError extends Error {
    httpCode;
    message;
    constructor(message, httpCode) {
        super(message);
        this.httpCode = httpCode;
        this.message = message;
    }
}
exports.AppError = AppError;
//# sourceMappingURL=app-error.js.map