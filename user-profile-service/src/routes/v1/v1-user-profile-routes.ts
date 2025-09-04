import { Router } from "express";
import { protect } from "../../middleware/auth-middleware";
import UserProfileController from "../../controller/user-profile-controller";

const router:Router=Router();
const userProfileController:UserProfileController=new UserProfileController();


router.post('/profile',protect,userProfileController.createOrUpdateUserProfile);
router.get('/profile',protect,userProfileController.getUserProfile);

export default router as Router