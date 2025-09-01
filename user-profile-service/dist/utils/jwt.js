"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = exports.generateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_config_1 = require("../config/dotenv.config");
const generateToken = (userID, role) => {
    const token = jsonwebtoken_1.default.sign({ id: userID, role }, dotenv_config_1.JWT_SECRET, { expiresIn: '1h' });
    return token;
};
exports.generateToken = generateToken;
const verifyToken = (token) => {
    return jsonwebtoken_1.default.verify(token, dotenv_config_1.JWT_SECRET);
};
exports.verifyToken = verifyToken;
//# sourceMappingURL=jwt.js.map