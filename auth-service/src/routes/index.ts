import { Router } from "express";
import v1AuthRoutes from "./v1/v1-auth-routes";

const router:Router = Router();
router.use('/v1', v1AuthRoutes);

export default router;

