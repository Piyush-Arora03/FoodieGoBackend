import CartRepository from "../repository/cart-repository";
import { RESTAURANT_SERVICE_URL } from "../config/dotenv.config";
import axios from "axios";
import { AppError } from "../utils/app-error";
import { STATUS_CODE } from "../config/status-code.config";
import logger from "../config/logger.config";
import { MenuItem } from "@foodiego/common-types";

class CartService {
    private cartRepository: CartRepository;
    constructor() {
        this.cartRepository = new CartRepository();
    }

    async addToCart(userId: string, itemId: string, quantity: number = 1, token: string) {
        try {
            console.log("Adding to cart:", { userId, itemId, quantity });
            logger.info(`Verifying item ${itemId} from restaurant service`);
            const itemResponse = await axios.get(`${RESTAURANT_SERVICE_URL}/api/v1/restaurants/menu-items/${itemId}`,
                {
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        'x-package-name': 'com.example.rider'
                    },
                }
            );
            logger.info(`Received response from restaurant service for item ${itemId}: ${itemResponse.status}`);
            if (itemResponse.status !== STATUS_CODE.OK) {
                throw new AppError('Item not found', STATUS_CODE.NOT_FOUND);
            }
            logger.info(`Item ${itemId} found in restaurant service`);
            const currentQuantity = await this.cartRepository.getItemQuantity(userId, itemId);
            const newQuantity = currentQuantity + quantity;
            if (newQuantity <= 0) {
                await this.cartRepository.removeFromCart(userId, itemId);
                return { itemId, quantity: 0 };
            }
            if (newQuantity > 8) {
                throw new AppError('Cannot add more than 8 items', STATUS_CODE.BAD_REQUEST);
            }
            const cartItem = await this.cartRepository.addtoCart(userId, itemId, newQuantity);
            return cartItem;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async removeFromCart(userId: string, itemId: string) {
        try {
            const currentQuantity = await this.cartRepository.getItemQuantity(userId, itemId);
            if (currentQuantity === 0) {
                throw new AppError('Item not in cart', STATUS_CODE.NOT_FOUND);
            }
            await this.cartRepository.removeFromCart(userId, itemId);
            return { itemId };
        } catch (error) {
            throw error;
        }
    }
    async getCart(userId: string, token: string) {
        try {

            const cart = await this.cartRepository.getCart(userId);
            const itemIds = Object.keys(cart);
            console.log("Item Ids in cart are", itemIds);

            if (itemIds.length === 0) {
                return { items: [], totalPrice: 0 };
            }
            console.log("Fetching item details from restaurant service for items:", itemIds);
            const response = await axios.post(`http://localhost:3000/api/v1/restaurants/menu-items/batch`,
                { itemIds },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'x-package-name': 'com.example.rider'
                    }
                }
            );
            console.log("Response from restaurant service for multiple items:", response.data);
            if (response.status !== STATUS_CODE.OK) {
                throw new AppError('Error fetching item details', STATUS_CODE.INTERNAL_SERVER_ERROR);
            }
            const itemDetailsMap: Map<string, MenuItem> = new Map(response.data.data.map((item: any) => [item.id, item]));

            const detailedItems = [];
            let totalPrice = 0;

            for (const itemId of itemIds) {
                const details: MenuItem | undefined = itemDetailsMap.get(itemId);
                const quantity = parseInt(cart[itemId]!, 10);

                if (details) {
                    detailedItems.push({
                        itemId: itemId,
                        quantity: quantity,
                        name: details.name,
                        price: details.price,
                        subtotal: parseFloat((details.price * quantity).toFixed(2)),
                    });
                    totalPrice += details.price * quantity;
                } else {
                    logger.warn(`Item ${itemId} not found in restaurant service, removing from cart.`);
                    await this.removeFromCart(userId, itemId);
                }
            }

            return { items: detailedItems, totalPrice: parseFloat(totalPrice.toFixed(2)) };
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async clearCart(userId: string) {
        try {
            await this.cartRepository.clearCart(userId);
            return true;
        } catch (error) {
            throw error;
        }
    }
}

export default CartService;