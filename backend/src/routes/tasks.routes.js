import {Router} from 'express';
import { verifyUser } from '../middlewares/auth.middleware.js';
import { createTask, getAllTasks } from '../controllers/task.controllers.js';

const router = Router();

router.route("/create").post(verifyUser, createTask);
router.route("/alltasks").get(verifyUser, getAllTasks);

export default router;