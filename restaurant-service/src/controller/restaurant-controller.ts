import { Request, Response, NextFunction } from 'express';
import RestaurantService from '../service/restaurant-service';
import logger from '../config/logger.config';
import { Restaurant } from '../../node_modules/.prisma/restuarant-client'
import { JwtPayload } from '@foodiego/common-types';
import { STATUS_CODE } from '../config/status-code.config';
import { AppError } from '../utils/app-error';



const restaurantService = new RestaurantService();



async function createRestaurant(req: Request, res: Response, next: NextFunction) {
    try {
        console.log("creating restaurant with data controller-->", req.body);
        const userPayload = req.headers['x-user-payload'] as string;
        console.log("user payload is", userPayload);
        const parsePayload = JSON.parse(userPayload!) as JwtPayload;
        console.log("parse payload is", parsePayload);
        const ownerId = parsePayload.id;
        const restaurantData = req.body;
        logger.info(`User ${ownerId} creating restaurant: ${restaurantData.name}`);
        const newRestaurant = await restaurantService.createRestaurant(restaurantData, ownerId);
        res.status(STATUS_CODE.CREATED).json({ status: 'success', data: newRestaurant });
    } catch (error) {
        logger.error('Error creating restaurant', { error });
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
};

async function getAllRestaurants(req: Request, res: Response, next: NextFunction) {
    try {
        const restaurants: Restaurant[] = await restaurantService.findAll();
        res.status(STATUS_CODE.OK).json({ status: 'success', results: restaurants.length, data: restaurants });
    } catch (error) {
        logger.error('Error fetching all restaurants', { error }); 4
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
};

async function addMenuItem(req: Request, res: Response, next: NextFunction) {
    try {
        const { restaurantId } = req.params;
        const userPayload = req.headers['x-user-payload'] as string;
        const parsePayload = JSON.parse(userPayload!) as JwtPayload;
        const ownerId = parsePayload.id;
        const menuItemData = req.body;
        const file = req.file;

        logger.info(`User ${ownerId} adding menu item to restaurant ${restaurantId}`);
        const newMenuItem = await restaurantService.addMenuItem(restaurantId!, ownerId, menuItemData, file!);
        res.status(STATUS_CODE.CREATED).json({ status: 'success', data: newMenuItem });
    } catch (error) {
        logger.error('Error adding menu item', { error });
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

export { createRestaurant, getAllRestaurants, addMenuItem };