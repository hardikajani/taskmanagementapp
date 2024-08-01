import {Router} from 'express';
import { login, logout, registerUser } from '../controllers/users.controllers.js';
import { verifyUser } from '../middlewares/auth.middleware.js';

const router = Router();

router.route("/register").post(registerUser);
router.route("/login").post(login);
router.route("/logout").get(verifyUser, logout);

export default router;