import express from 'express';
import cors from 'cors';
import cookieParser from "cookie-parser"

const app = express();

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
}));

app.use(express.json({limit: "16kb"}));
app.use(express.urlencoded({extended: true, limit: "16kb"}));
app.use(express.static("public"));
app.use(cookieParser())


// routers import
import usersRouter from './routes/users.routes.js';
import tasksRouter from './routes/tasks.routes.js';

// router declaration
app.use('/api/users', usersRouter);
app.use('/api/tasks', tasksRouter);


// http://localhost:5000/api/v1/users/register

export { app } 