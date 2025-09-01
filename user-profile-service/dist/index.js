"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_config_1 = require("./config/dotenv.config");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.get('/health', (req, res) => {
    res.status(200).json({
        message: `working fine at port :${dotenv_config_1.PORT}`
    });
});
app.listen(dotenv_config_1.PORT, async () => {
    console.log("server is working");
});
//# sourceMappingURL=index.js.map