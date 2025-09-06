import express, { Application } from 'express'
import cors from 'cors'
import morgan from 'morgan'
import { createProxyMiddleware, fixRequestBody } from 'http-proxy-middleware';
import { service } from './config/service';
import { protect } from './middleware/auth-middleware';
import apiLimiter from './config/api-limiter.config';

const app: Application = express();
app.use(express.json());
app.use(cors());
app.use(morgan('dev'));
app.use(apiLimiter);

const protectedRoutes = ['/api/v1/users', '/api/v1/addresses']

app.use((req, res, next) => {
    const correlationId = req.headers['x-correlation-id'] || crypto.randomUUID();
    req.headers['x-correlation-id'] = correlationId;
    res.setHeader('x-correlation-id', correlationId);
    next();
});

service.forEach(({ route, target }) => {
    const proxyOptions = {
        target,
        changeOrigin: true,
        onProxyReq: fixRequestBody,
    }
    if (protectedRoutes.some(p => route.startsWith(p))) {
        app.use(route, protect, createProxyMiddleware({
            ...proxyOptions, pathRewrite: (path, req) => route + path
        }));
    } else {
        app.use(route, createProxyMiddleware({
            ...proxyOptions, pathRewrite: (path, req) => route + path
        }));
    }
});

app.get('/health', (req, res) => {
    res.status(200).json({
        message: "api gateway is working fine"
    })
});

export default app;