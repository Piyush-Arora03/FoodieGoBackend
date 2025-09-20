import logger from "../config/logger.config";
import { Request, Response, NextFunction } from "express";
import { STATUS_CODE } from "../config/status-code.config";
import CartService from "../service/cart-service";
import { AppError } from "../utils/app-error";
import { JwtPayload } from "../../../packages/common-types/dist";

const cartService = new CartService();


async function addToCart(req: Request, res: Response, next: NextFunction) {
    try {
        const userPlayload = req.headers['x-user-payload'] as string;
        const parsePayload = JSON.parse(userPlayload!) as JwtPayload;
        const token = req.headers.authorization?.split(' ')[1];
        const userId: string = parsePayload.id;
        const { itemId, quantity } = req.body as { itemId: string; quantity: string };
        logger.info(`Adding item ${itemId} with quantity ${quantity} to cart for user ${userId}`);
        const cart = await cartService.addToCart(userId, itemId, parseInt(quantity), token!);
        console.log("cart after adding item is", cart);
        res.status(STATUS_CODE.OK).json({ status: 'success', data: cart });
    } catch (error) {
        console.log(error);
        logger.error('Error adding item to cart', { error });
        if (error instanceof AppError) {
            return res.status(error.httpCode).json({
                status: 'error',
                message: error.message
            });
        }
        return res.status(STATUS_CODE.INTERNAL_SERVER_ERROR).json({
            status: 'error',
            message: 'Internal server error'
        });
    }
}

async function removeFromCart(req: Request, res: Response, next: NextFunction) {
    try {
        const userPlayload = req.headers['x-user-payload'] as string;
        const parsePayload = JSON.parse(userPlayload!) as JwtPayload;
        const userId: string = parsePayload.id;
        const { itemId } = req.params as { itemId: string };
        logger.info(`Removing item ${itemId} from cart for user ${userId}`);
        const cart = await cartService.removeFromCart(userId, itemId);
        res.status(STATUS_CODE.OK).json({ status: 'success', data: cart });
    } catch (error) {
        logger.error('Error removing item from cart', { error });
        if (error instanceof AppError) {
            return res.status(error.httpCode).json({
                status: 'error',
                message: error.message
            });
        }
        return res.status(STATUS_CODE.INTERNAL_SERVER_ERROR).json({
            status: 'error',
            message: 'Internal server error'
        });
    }
}

async function getCart(req: Request, res: Response, next: NextFunction) {
    try {
        const userPlayload = req.headers['x-user-payload'] as string;
        const parsePayload = JSON.parse(userPlayload!) as JwtPayload;
        const userId: string = parsePayload.id;
        logger.info(`Fetching cart for user ${userId}`);
        const cart = await cartService.getCart(userId);
        res.status(STATUS_CODE.OK).json({ status: 'success', data: cart });
    } catch (error) {
        logger.error('Error fetching cart', { error });
        if (error instanceof AppError) {
            return res.status(error.httpCode).json({
                status: 'error',
                message: error.message
            });
        }
        return res.status(STATUS_CODE.INTERNAL_SERVER_ERROR).json({
            status: 'error',
            message: 'Internal server error'
        });
    }
}

async function clearCart(req: Request, res: Response, next: NextFunction) {
    try {
        const userPlayload = req.headers['x-user-payload'] as string;
        const parsePayload = JSON.parse(userPlayload!) as JwtPayload;
        const userId: string = parsePayload.id;
        logger.info(`Clearing cart for user ${userId}`);
        const cart = await cartService.clearCart(userId);
        res.status(STATUS_CODE.OK).json({ status: 'success', data: cart });
    } catch (error) {
        logger.error('Error clearing cart', { error });
        if (error instanceof AppError) {
            return res.status(error.httpCode).json({
                status: 'error',
                message: error.message
            });
        }
        return res.status(STATUS_CODE.INTERNAL_SERVER_ERROR).json({
            status: 'error',
            message: 'Internal server error'
        });
    }
}

export { addToCart, removeFromCart, getCart, clearCart };