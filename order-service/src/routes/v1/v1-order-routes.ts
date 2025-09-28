import { Router } from "express";
import { getCart, addToCart, removeFromCart, clearCart } from "../../controller/cart-controller";
import { validate } from "../../middleware/validator";
import { cartSchema } from "../../schema/cart-schema";

const router: Router = Router();

router.get('/cart', getCart);
router.post('/cart', validate(cartSchema), addToCart);
router.delete('/:itemId', removeFromCart);
router.delete('/', clearCart);

export default router;