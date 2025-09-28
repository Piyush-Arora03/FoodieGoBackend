import redisClient from "../config/redis";
import { AppError } from "../utils/app-error";
import { STATUS_CODE } from "../config/status-code.config";

class CartRepository{
    async addtoCart(userId:string,itemId:string,quantity:number=1){
        try {
            const cartKey=`cart:${userId}`;
            await redisClient.hset(cartKey,itemId,quantity.toString());
            return {itemId,quantity:quantity};
        } catch (error) {
            throw new AppError('Error adding to cart',STATUS_CODE.INTERNAL_SERVER_ERROR);
        }
    }

    async removeFromCart(userId:string,itemId:string){
        try {
            const cartKey=`cart:${userId}`;
            await redisClient.hdel(cartKey,itemId);
            return {itemId};
        } catch (error) {
            throw new AppError('Error removing from cart',STATUS_CODE.INTERNAL_SERVER_ERROR);
        }
    }

    async getCart(userId:string):Promise<Record<string,string>>{
        try {
            const cartKey=`cart:${userId}`;
            const cartItems=await redisClient.hgetall(cartKey);
            return cartItems;
        } catch (error) {
            throw new AppError('Error fetching cart',STATUS_CODE.INTERNAL_SERVER_ERROR);
        }
    }

    async getItemQuantity(userId:string,itemId:string){
        try {
            const cartKey=`cart:${userId}`;
            const quantity=await redisClient.hget(cartKey,itemId);
            return quantity ? parseInt(quantity) : 0;
        } catch (error) {
            throw new AppError('Error fetching item quantity',STATUS_CODE.INTERNAL_SERVER_ERROR);
        }
    }

    async clearCart(userId:string){
        try {
            const cartKey=`cart:${userId}`;
            await redisClient.del(cartKey);
            return true;
        } catch (error) {
            throw new AppError('Error clearing cart',STATUS_CODE.INTERNAL_SERVER_ERROR);
        }
    }
}

export default CartRepository;