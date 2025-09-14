import { Router } from "express";
import v1RestaurantRoutes from "./v1/v1-restaurant-routes";

const router:Router = Router();
router.use('/v1/restaurants', v1RestaurantRoutes);

export default router;

