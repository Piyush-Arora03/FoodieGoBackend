import { Router } from "express";
import { protect } from "../../middleware/auth-middleware";
import { getUserProfile, createOrUpdateUserProfile } from "../../controller/user-profile-controller";

const router = Router();

router.post('/', protect, createOrUpdateUserProfile);
router.get('/', protect, getUserProfile);

export default router as Router