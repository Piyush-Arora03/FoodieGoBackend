import { Router } from 'express';
import AuthController from '../../controller/auth-controller';

const router:Router = Router();
const authController = new AuthController();

router.post('/signup', authController.registerUser);
router.post('/login', authController.loginUser);
router.post('/oauth', authController.handleGoogleSignIn);

export default router;