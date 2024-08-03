import {Router} from 'express';
import { verifyUser } from '../middlewares/auth.middleware.js';
import { createTask, deleteTask, getAllTasks, updateTask } from '../controllers/task.controllers.js';

const router = Router();

router.route("/create").post(verifyUser, createTask);
router.route("/alltasks").get(verifyUser, getAllTasks);
router.route("/deleteTask/:id").delete(verifyUser, deleteTask);
router.route("/updateTask/:id").put(verifyUser, updateTask);


export default router;