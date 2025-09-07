import { Router } from 'express';
import AuthController from '../../controller/auth-controller';
import { validate } from '../../middleware/auth-validator';
import { registerUserSchema, loginUserSchema, oAuthSignInSchema } from '../../schema/auth.schema';

const router: Router = Router();
const authController = new AuthController();

router.post('/signup', validate(registerUserSchema), authController.registerUser);
router.post('/login', validate(loginUserSchema), authController.loginUser);
router.post('/oauth', validate(oAuthSignInSchema), authController.handleGoogleSignIn);

export default router;