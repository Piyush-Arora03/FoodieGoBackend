declare class AppError extends Error {
    httpCode: number;
    message: string;
    constructor(message: string, httpCode: number);
}
export { AppError };
//# sourceMappingURL=app-error.d.ts.map