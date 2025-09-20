import RestaurantRepository from "../repository/restaurant-repository";
import geoService from "../service/geo-service";
import { Restaurant } from "../../node_modules/.prisma/restuarant-client";
import { AppError } from "../utils/app-error";
import { STATUS_CODE } from "../config/status-code.config";
import uploadService from "./upload-service";
import logger from "../config/logger.config";
import redisClient from "../config/redis";
import { MenuItem } from "../../node_modules/.prisma/restuarant-client";





class RestaurantService {
    private restaurantRepository: RestaurantRepository;

    constructor() {
        this.restaurantRepository = new RestaurantRepository();
    }

    async createRestaurant(data: any, ownerId: string) {
        try {
            console.log("creating restaurant with data service-->", data);
            const fullAddress = `${data.street},${data.city},${data.state},${data.postalCode}`
            const coordinates = await geoService.getCoordinates(fullAddress);
            const completeData = {
                ...data,
                latitude: coordinates.lat,
                longitude: coordinates.lng
            }
            const restaurant = await this.restaurantRepository.createRestaurant(completeData, ownerId);
            return restaurant;
        } catch (error) {
            throw error;
        }
    }

    async findAll(lat?: number, lng?: number, radiusInMeters?: number): Promise<Restaurant[]> {
        try {
            if (lat && lng) {
                const restaurants: Restaurant[] = await this.restaurantRepository.findNearby(lat, lng, radiusInMeters);
                return restaurants;
            }
            const restaurants: Restaurant[] = await this.restaurantRepository.findAll();
            return restaurants;
        } catch (error) {
            throw error;
        }
    }

    async addMenuItem(restaurantId: string, ownerId: string, data: any, file: Express.Multer.File) {
        try {
            const restaurant: Restaurant | null = await this.restaurantRepository.findById(restaurantId);
            if (!restaurant) {
                throw new AppError("Restaurant not found", STATUS_CODE.BAD_REQUEST);
            }
            if (restaurant.ownerId !== ownerId) {
                throw new AppError("Unauthorized", STATUS_CODE.UNAUTHORIZED);
            }
            let imageUrl: string | undefined = undefined;
            if (file) {
                imageUrl = await uploadService.uploadImage(file);
            }
            const menuItem = await this.restaurantRepository.addMenuItem(restaurantId, { ...data, imageUrl });
            const cacheKey = `cache:menu:${restaurantId}`;
            logger.info(`removing cached key ${cacheKey}`);
            await redisClient.del(cacheKey);
            return menuItem;
        } catch (error) {
            throw error;
        }
    }

    async search(query: string, cuisine?: string) {
        try {
            if (!query && !cuisine) {
                return this.findAll();
            }
            const restaurants = await this.restaurantRepository.search(query, cuisine);
            return restaurants;
        } catch (error) {
            throw error;
        }
    }

    private async verifyOwner(itemId: string, ownerId: string) {
        try {
            const item = await this.restaurantRepository.findMenuItem(itemId);
            if (!item || item.category.restaurant.ownerId !== ownerId) {
                throw new AppError("Item not found or Unauthorized", STATUS_CODE.BAD_REQUEST);
            }
            return item.category.restaurant;
        } catch (error) {
            logger.info(`Error while verifying owner: ${error}`)
            throw new AppError("Error while verifying owner", STATUS_CODE.INTERNAL_SERVER_ERROR);
        }
    }

    async setItemAvailability(itemId: string, ownerId: string, isAvailable: boolean) {
        try {
            const restaurant = await this.verifyOwner(itemId, ownerId);
            const redisKey = `unavailable_item:${restaurant.id}`;
            if (isAvailable) {
                await redisClient.srem(redisKey, itemId);
                return { status: `${itemId} is now available` };
            } else {
                await redisClient.sadd(redisKey, itemId);
                return { status: `${itemId} is now unavailable` };
            }
        } catch (error) {
            throw error;
        }
    }

    async getAllMenu(restaurantId: string): Promise<MenuItem[] | null> {
        try {
            const cacheKey = `cache:menu:${restaurantId}`;
            const unavailableKey = `unavailable_item:${restaurantId}`;
            const cachedMenu = await redisClient.get(cacheKey);
            let items: MenuItem[] | null;
            if (cachedMenu) {
                logger.info("Cached Menu Found ", restaurantId);
                items = JSON.parse(cachedMenu);
            } else {
                logger.info("Cached Menu Not Found ", restaurantId);
                items = await this.restaurantRepository.getAllMenu(restaurantId);
                await redisClient.setex(cacheKey, 60 * 60, JSON.stringify(items))
            }
            if (!items) {
                throw new AppError("No items found", STATUS_CODE.NOT_FOUND);
            }
            const unavailableIds = await redisClient.get(unavailableKey);
            const unavailableSet = new Set(unavailableIds);
            items.forEach((item) => {
                item.isAvailable = !(unavailableSet.has(item.id));
            });
            return items as MenuItem[];
        } catch (error) {
            throw error;
        }
    }

    async getMenuByCategory(categoryId: string): Promise<MenuItem[] | null> {
        try {
            const cacheKey = `cache:menu:${categoryId}`;
            const unavailableKey = `unavailable_item:${categoryId}`;
            const cachedMenu = await redisClient.get(cacheKey);
            let items: MenuItem[] | null;
            if (cachedMenu) {
                logger.info("Cached Menu Found ", categoryId);
                items = JSON.parse(cachedMenu);
            } else {
                logger.info("Cached Menu Not Found ", categoryId);
                items = await this.restaurantRepository.listMenuByCategory(categoryId);
                await redisClient.setex(cacheKey, 60 * 60, JSON.stringify(items))
            }
            if (!items) {
                throw new AppError("No items found", STATUS_CODE.NOT_FOUND);
            }
            const unavailableIds = await redisClient.get(unavailableKey);
            const unavailableSet = new Set(unavailableIds);
            items.forEach((item) => {
                item.isAvailable = !(unavailableSet.has(item.id));
            });
            return items as MenuItem[];
        } catch (error) {
            throw error;
        }
    }

    async getMenuItem(itemId: string): Promise<MenuItem | null> {
        try {
            logger.info(`Fetching menu item with id ${itemId}`);
            const item: MenuItem | null = await this.restaurantRepository.getItemById(itemId);
            if (!item) {
                throw new AppError("Item not found", STATUS_CODE.NOT_FOUND);
            }
            logger.info(`Fetched menu item: ${item.id}`);
            return item;
        } catch (error) {
            throw error;
        }
    }
}

export default RestaurantService;