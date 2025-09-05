import { Router } from "express";
import v1UserRoutes from './v1/index';

const router: Router = Router();
router.use('/v1', v1UserRoutes);


export default router