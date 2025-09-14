import { Router } from "express";
import uploadSingleImage from "../../middleware/upload-middleware";
import { addRestaurantSchema, addMenuItemSchema } from "../../schema/restaurnat.schema";
import { validate } from "../../middleware/validator";
import { createRestaurant , addMenuItem} from "../../controller/restaurant-controller";

const route:Router=Router();

route.post('/',validate(addRestaurantSchema),createRestaurant);
route.post('/:restaurantId/menu-items',uploadSingleImage,validate(addMenuItemSchema),addMenuItem);

export default route;



