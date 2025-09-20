import { prisma } from '../db'
import { Restaurant, MenuItem } from '../../node_modules/.prisma/restuarant-client'
import { AppError } from '../utils/app-error';
import { STATUS_CODE } from '../config/status-code.config';
import logger from '../config/logger.config';

class RestaurantRepository {

    async createRestaurant(data: any, ownerId: string): Promise<Restaurant> {
        try {
            console.log("creating restaurant with data-->", data);
            const restaurant: Restaurant = await prisma.restaurant.create({
                data: {
                    ...data,
                    ownerId
                }
            });
            return restaurant;
        } catch (error) {
            console.log("error while creating restaurant-->", error);
            throw new AppError("Error while creating restaurant", STATUS_CODE.INTERNAL_SERVER_ERROR);
        }
    }

    async findAll(): Promise<Restaurant[]> {
        try {
            const restaurants = await prisma.restaurant.findMany();
            return restaurants;
        } catch (error) {
            throw new AppError("Error while fetching restaurants", STATUS_CODE.INTERNAL_SERVER_ERROR);
        }
    }

    async findNearby(lat: number, lng: number, radiusInMeters: number = 5000): Promise<Restaurant[]> {
        try {
            const restaurants: Restaurant[] = await prisma.$queryRaw`
           SELECT * FROM "Restaurant"
            WHERE ST_DWithin(
                ST_MakePoint(longitude, latitude)::geography,
                ST_MakePoint(${lng}, ${lat})::geography,
                ${radiusInMeters}
            )`
            return restaurants;
        } catch (error) {
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

    async findById(restaurantId: string): Promise<Restaurant | null> {
        try {
            const restaurant: Restaurant | null = await prisma.restaurant.findUnique({
                where: {
                    id: restaurantId
                }
            });
            return restaurant;
        } catch (error) {
            throw new AppError("Error while fetching restaurant", STATUS_CODE.INTERNAL_SERVER_ERROR);
        }
    }

    async search(query: string, cuisine?: string) {
        try {
            // const searchTerm=query.split(' ').join(' & ');
            const restaurant = await prisma.$queryRaw`
        SELECT *,
               -- Calculate the similarity of the name and cuisine to the search query
               SIMILARITY(name, ${query}) AS name_similarity,
               SIMILARITY(cuisine, ${query}) AS cuisine_similarity
        FROM "Restaurant"
        WHERE (
            -- Check for similarity score above a threshold OR use ILIKE for partial matches
            SIMILARITY(name, ${query}) > 0.1 OR
            SIMILARITY(cuisine, ${query}) > 0.1 OR
            name ILIKE ${'%' + query + '%'}
        )
        -- If a cuisine filter is provided, add it to the WHERE clause
        AND (${cuisine}::text IS NULL OR cuisine ILIKE ${'%' + cuisine + '%'})
        -- Order the results by the highest similarity score first
        ORDER BY name_similarity DESC, cuisine_similarity DESC
        `;

            return restaurant;
        } catch (error) {
            throw new AppError("Error while searching restaurants", STATUS_CODE.INTERNAL_SERVER_ERROR);
        }
    }

    async findMenuItem(itemId: string): Promise<{ category: { restaurant: Restaurant; }; } | null> {
        try {
            const item = await prisma.menuItem.findUnique({
                where: {
                    id: itemId
                },
                select: { category: { select: { restaurant: true } } }
            });
            return item;
        } catch (error) {
            throw new AppError("Error while fetching menu item", STATUS_CODE.INTERNAL_SERVER_ERROR);
        }
    }

    async getAllMenu(restaurantId: string): Promise<MenuItem[] | null> {
        try {
            const restaurant = await prisma.restaurant.findUnique({
                where: { id: restaurantId },
                include: {
                    menuCategories: {
                        include: {
                            items: true
                        }
                    }
                }
            });

            if (!restaurant) {
                throw new AppError("Restaurant not found", STATUS_CODE.NOT_FOUND);
            }

            if (restaurant.menuCategories.length > 0) {
                let res: MenuItem[] = [];
                for (const category of restaurant.menuCategories) {
                    res.push(...category.items);
                }
                return res;
            }

            return null;
        } catch (error) {
            if (error instanceof AppError) throw error;
            throw new AppError("Error while fetching menu items", STATUS_CODE.INTERNAL_SERVER_ERROR);
        }
    }


    async listMenuByCategory(categoryId: string): Promise<MenuItem[]> {
        try {
            const category = await prisma.menuCategory.findUnique({
                where: { id: categoryId },
                include: { items: true }
            });
            if (!category) {
                throw new AppError("Category not found", STATUS_CODE.NOT_FOUND);
            }
            return category.items;
        } catch (error) {
            throw new AppError("Error while fetching menu items", STATUS_CODE.INTERNAL_SERVER_ERROR)
        }
    }

    async getItemById(itemId: string): Promise<MenuItem | null> {
        try {
            logger.info(`Fetching menu item in repo with id ${itemId}`);
            const item: MenuItem | null = await prisma.menuItem.findUnique({
                where: { id: itemId }
            });
            logger.info(`Fetched menu item in repo: ${item?.id}`);
            return item;
        } catch (error) {
            throw new AppError("Error while fetching menu item", STATUS_CODE.INTERNAL_SERVER_ERROR);
        }
    }

}


export default RestaurantRepository;