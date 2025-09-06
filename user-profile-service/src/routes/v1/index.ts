import v1ProfileRoutes from './v1-user-profile-routes'
import v1AddressRoutes from './v1-user-address-routes'
import { Router } from "express";

const router: Router = Router();
router.use('/addresses', v1AddressRoutes);
router.use('/users', v1ProfileRoutes);

export default router as Router;