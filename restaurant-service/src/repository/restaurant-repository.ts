import { prisma } from '../db'
import { Restaurant } from '../../node_modules/.prisma/restuarant-client'
import { AppError } from '../utils/app-error';
import { STATUS_CODE } from '../config/status-code.config';

class RestaurantRepository {

    async createRestaurant(data: any, ownerId: string): Promise<Restaurant> {
        try {
            console.log("creating restaurant with data-->",data);
            const restaurant: Restaurant = await prisma.restaurant.create({
                data: {
                    ...data,
                    ownerId
                }
            });
            return restaurant;
        } catch (error) {
            console.log("error while creating restaurant-->",error);
            throw new AppError("Error while creating restaurant", STATUS_CODE.INTERNAL_SERVER_ERROR);
        }
    }

    async findAll() : Promise<Restaurant[]> {
        try {
            const restaurants = await prisma.restaurant.findMany();
            return restaurants;
        } catch (error) {
            throw new AppError("Error while fetching restaurants", STATUS_CODE.INTERNAL_SERVER_ERROR);
        }
    }

    async findNearby(lat: number, lng: number,radiusInMeters:number=5000): Promise<Restaurant[]> {
        try {
            const restaurants : Restaurant[] = await prisma.$queryRaw`
           SELECT * FROM "Restaurant"
            WHERE ST_DWithin(
                ST_MakePoint(longitude, latitude)::geography,
                ST_MakePoint(${lng}, ${lat})::geography,
                ${radiusInMeters}
            )`

            return restaurants;
        }catch(error){
            throw new AppError("Error while fetching nearby restaurants", STATUS_CODE.INTERNAL_SERVER_ERROR)
        }
    }

    async addMenuItem(restaurantId: string, data: any) {
    const category = await prisma.menuCategory.upsert({
        where: { restaurantId_name: { restaurantId, name: data.categoryId } },
        update: {},
        create: { name: data.categoryId, restaurantId },
    });

    return prisma.menuItem.create({
        data: {
            name: data.name,
            description: data.description,
            price: data.price,
            imageUrl: data.imageUrl,
            categoryId: category.id,
        }
    });
  }

  async findById(restaurantId:string):Promise<Restaurant|null>{
    try {
        const restaurant:Restaurant|null=await prisma.restaurant.findUnique({
            where:{
                id:restaurantId
            }
        });
        return restaurant;
    } catch (error) {
        throw new AppError("Error while fetching restaurant", STATUS_CODE.INTERNAL_SERVER_ERROR);
    }
  }
}

export default RestaurantRepository;