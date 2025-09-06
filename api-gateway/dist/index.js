"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_config_1 = require("./config/dotenv.config");
const app_1 = __importDefault(require("./app"));
app_1.default.listen(dotenv_config_1.PORT, () => {
    console.log(`Server is running on port ${dotenv_config_1.PORT}`);
});
//# sourceMappingURL=index.js.map