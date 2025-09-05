import v1ProfileRoutes from './v1-user-profile-routes'
import v1AddressRoutes from './v1-user-address-routes'
import { Router } from "express";

const router: Router = Router();
router.use('/address', v1AddressRoutes);
router.use('/profile', v1ProfileRoutes);

export default router as Router;