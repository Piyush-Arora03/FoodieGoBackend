import { Router } from "express";
import uploadSingleImage from "../../middleware/upload-middleware";
import { addRestaurantSchema, addMenuItemSchema } from "../../schema/restaurnat.schema";
import { validate } from "../../middleware/validator";
import { createRestaurant, addMenuItem, search, getAllRestaurants, setItemAvailability, getAllMenu, getMenuByCategory } from "../../controller/restaurant-controller";

const route: Router = Router();

route.post('/', validate(addRestaurantSchema), createRestaurant);
route.post('/:restaurantId/menu-items', uploadSingleImage, validate(addMenuItemSchema), addMenuItem);
route.get('/', getAllRestaurants);
route.get('/search', search);
route.patch('/menu-items/:itemId/availability', validate(addMenuItemSchema), setItemAvailability);
route.get('/:restaurantId/menu-items', getAllMenu);
route.get('/:restaurantId/:categoryId/menu-items', getMenuByCategory);

export default route;



