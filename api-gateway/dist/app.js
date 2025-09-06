"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const http_proxy_middleware_1 = require("http-proxy-middleware");
const service_1 = require("./config/service");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use((0, morgan_1.default)('dev'));
service_1.service.forEach(({ route, target }) => {
    app.use(route, (0, http_proxy_middleware_1.createProxyMiddleware)({
        target,
        changeOrigin: true,
    }));
});
app.get('/health', (req, res) => {
    res.status(200).json({
        message: "api gateway is working fine"
    });
});
exports.default = app;
//# sourceMappingURL=app.js.map