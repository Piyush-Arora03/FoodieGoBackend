import CartRepository from "../repository/cart-repository";
import { RESTAURANT_SERVICE_URL } from "../config/dotenv.config";
import axios from "axios";
import { AppError } from "../utils/app-error";
import { STATUS_CODE } from "../config/status-code.config";
import logger from "../config/logger.config";

class CartService{
    private cartRepository:CartRepository;
    constructor(){
        this.cartRepository=new CartRepository();
    }

    async addToCart(userId:string,itemId:string,quantity:number=1,token:string){
        try {
            console.log("Adding to cart:", {userId, itemId, quantity});
            logger.info(`Verifying item ${itemId} from restaurant service`);
            const itemResponse=await axios.get(`${RESTAURANT_SERVICE_URL}/api/v1/restaurants/menu-items/${itemId}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );
            logger.info(`Received response from restaurant service for item ${itemId}: ${itemResponse.status}`);
            if(itemResponse.status!==STATUS_CODE.OK){
                throw new AppError('Item not found',STATUS_CODE.NOT_FOUND);
            }
            logger.info(`Item ${itemId} found in restaurant service`);
            const currentQuantity=await this.cartRepository.getItemQuantity(userId,itemId);
            const newQuantity=currentQuantity+quantity;
            if(newQuantity<=0){
                await this.cartRepository.removeFromCart(userId,itemId);
                return {itemId,quantity:0};
            }
            if(newQuantity>8){
                throw new AppError('Cannot add more than 8 items',STATUS_CODE.BAD_REQUEST);
            }
            const cartItem=await this.cartRepository.addtoCart(userId,itemId,newQuantity);
            return cartItem;
        } catch (error) {
            throw error;
        }
    }

    async removeFromCart(userId:string,itemId:string){
        try {
            const currentQuantity=await this.cartRepository.getItemQuantity(userId,itemId);
            if(currentQuantity===0){
                throw new AppError('Item not in cart',STATUS_CODE.NOT_FOUND);
            }
            await this.cartRepository.removeFromCart(userId,itemId);
            return {itemId};
        } catch (error) {
            throw error;
        }
    }

    async getCart(userId:string){
        try {
            const cartItems=await this.cartRepository.getCart(userId);
            return cartItems;
        } catch (error) {
            throw error;
        }
    }

    async clearCart(userId:string){
        try {
            await this.cartRepository.clearCart(userId);
            return true;
        } catch (error) {
            throw error;
        }
    }
}

export default CartService;