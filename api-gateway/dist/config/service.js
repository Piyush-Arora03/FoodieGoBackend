"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.service = void 0;
exports.service = [
    {
        route: "/api/v1/auth",
        target: "http://auth-service:3001"
    },
    {
        route: "/api/v1/user",
        target: "http://user-profile-service:3001"
    },
];
//# sourceMappingURL=service.js.map