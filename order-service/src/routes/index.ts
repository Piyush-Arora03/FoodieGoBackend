import { Router } from "express";

const router: Router = Router();
import v1OrderRoute from "./v1/v1-order-routes";

router.use('/v1/orders', v1OrderRoute);
export default router;