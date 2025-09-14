import RestaurantRepository from "../repository/restaurant-repository";
import geoService from "../service/geo-service";
import { Restaurant } from "../../node_modules/.prisma/restuarant-client";
import { AppError } from "../utils/app-error";
import { STATUS_CODE } from "../config/status-code.config";
import uploadService from "./upload-service";



class RestaurantService {
    private restaurantRepository: RestaurantRepository;

    constructor() {
        this.restaurantRepository = new RestaurantRepository();
    }

    async createRestaurant(data: any, ownerId: string) {
        try {
            console.log("creating restaurant with data service-->",data);
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
            return menuItem;
        } catch (error) {
            throw error;
        }   
    }
}

export default RestaurantService;