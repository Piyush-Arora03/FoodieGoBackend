"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.protect = void 0;
const app_error_1 = require("../utils/app-error");
const status_code_config_1 = require("../config/status-code.config");
const jwt_1 = require("../utils/jwt");
const protect = (req, res, next) => {
    try {
        let token;
        console.log("protect is called");
        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
            token = req.headers.authorization.split(' ')[1];
        }
        console.log("token is", token);
        if (!token) {
            return next(new app_error_1.AppError('You are not logged in', status_code_config_1.STATUS_CODE.UNAUTHORIZED));
        }
        const decoded = (0, jwt_1.verifyToken)(token);
        console.log("decoded data is ", decoded);
        req.user = { id: decoded.id, role: decoded.role };
        console.log(req.user);
        next();
    }
    catch (error) {
        console.log(error);
        throw new app_error_1.AppError('Error while authentication', status_code_config_1.STATUS_CODE.INTERNAL_SERVER_ERROR);
    }
};
exports.protect = protect;
//# sourceMappingURL=auth-middleware.js.map