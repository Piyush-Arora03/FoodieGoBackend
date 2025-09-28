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
        let lat = undefined
        let lng = undefined
        if (!req.query.lat && !req.query.lng) {
            lat = parseFloat(req.query.lat as string) as number;
            lng = parseFloat(req.query.lng as string) as number;
        }
        logger.info('Fetching all restaurants');
        const restaurants: Restaurant[] = await restaurantService.findAll(lat, lng);
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

async function search(req: Request, res: Response, next: NextFunction) {
    try {
        const query = (req.query.q as string) || '';
        const cuisine = req.query.cuisine as string | undefined;

        logger.info('Searching for restaurants', { query, cuisine });
        const restaurants = await restaurantService.search(query, cuisine) as Restaurant[];
        res.status(STATUS_CODE.OK).json({ status: 'success', results: restaurants.length, data: restaurants });
    } catch (error) {
        logger.error('Error searching restaurants', { error });
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

async function setItemAvailability(req: Request, res: Response, next: NextFunction) {
    try {
        const { itemId } = req.params;
        const userPayload = req.headers['x-user-payload'] as string;
        const parsePayload = JSON.parse(userPayload!) as JwtPayload;
        const ownerId: string = parsePayload.id;
        const isAvailable: boolean = req.body.isAvailable;
        logger.info(`User ${ownerId} setting item ${itemId} availability to ${isAvailable}`);
        const response = await restaurantService.setItemAvailability(itemId as string, ownerId, isAvailable);
        res.status(STATUS_CODE.OK).json({ status: 'success', data: response });
    } catch (error) {
        logger.error('Error  setting item availability', { error });
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

async function getAllMenu(req: Request, res: Response, next: NextFunction) {
    try {
        const { restaurantId } = req.params as { restaurantId: string };
        logger.info(`Fetching all menu items for restaurant ${restaurantId}`);
        const menuItems = await restaurantService.getAllMenu(restaurantId);
        res.status(STATUS_CODE.OK).json({ status: 'success', data: menuItems });
    } catch (error) {
        logger.error('Error fetching all menu items', { error });
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

async function getMenuByCategory(req: Request, res: Response, next: NextFunction) {
    try {
        const { categoryId } = req.params as { categoryId: string };
        logger.info(`Fetching menu items for category ${categoryId}`);
        const menuItems = await restaurantService.getMenuByCategory(categoryId);
        res.status(STATUS_CODE.OK).json({ status: 'success', data: menuItems });
    } catch (error) {
        logger.error('Error fetching menu items', { error });
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

async function getMenuItem(req: Request, res: Response, next: NextFunction) {
    try {
        const { itemId } = req.params as { itemId: string };
        logger.info(`Fetching menu item ${itemId}`);
        const menuItem = await restaurantService.getMenuItem(itemId);
        res.status(STATUS_CODE.OK).json({ status: 'success', data: menuItem });
    } catch (error) {
        logger.error('Error fetching menu items', { error });
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

async function getMultipleItems(req: Request, res: Response, next: NextFunction) {
    try {
        const { itemIds } = req.body as { itemIds: string[] };
        logger.info(`Fetching multiple menu items ${itemIds}`);
        const menuItems = await restaurantService.getMultipleItems(itemIds);
        return res.status(STATUS_CODE.OK).json({ status: 'success', data: menuItems });
    } catch (error) {
        logger.error('Error fetching menu items', { error });
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

export {
    getMultipleItems,
    createRestaurant,
    getAllRestaurants,
    addMenuItem, search,
    setItemAvailability,
    getAllMenu,
    getMenuByCategory,
    getMenuItem
};