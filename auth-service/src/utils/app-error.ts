class AppError extends Error {
    public httpCode: number;
    public message: string;
    constructor(message: string, httpCode: number) {
        super(message);
        this.httpCode = httpCode;
        this.message = message;
    }
}

export { AppError };