import {prisma} from '../db'
import { Restaurant } from '../../node_modules/.prisma/restuarant-client'
import { AppError } from '../utils/app-error';
import { STATUS_CODE } from '../config/status-code.config';

class RestaurantRepository{

    async createRestaurant(data:any,ownerId:string):Promise<Restaurant>{
        try {
            const restaurant:Restaurant= await prisma.restaurant.create({
                data:{
                    ...data,
                    ownerId
                }
            });
            return restaurant;
        } catch (error) {
            throw new AppError("Error while creating restaurant",STATUS_CODE.INTERNAL_SERVER_ERROR);
        }
    }
}