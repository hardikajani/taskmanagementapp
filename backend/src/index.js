import dotenv from 'dotenv';
import connectDB from './db/index.js';
import { app } from './app.js';

dotenv.config({
    path: './env' 
});
const PORT = process.env.PORT || 5001;

connectDB()
.then(()=>{
    app.on("error",(error)=>{
        console.log("Error: app is not working", error);
        throw error;
    });
    app.listen(PORT, ()=>{
        console.log(`Server is running at port : ${PORT}`);
    });
})
.catch((err)=>{
    console.log("Mongodb connection failed !!", err);
})













// import express from 'express';

// const app = express();

// ;(async ()=>{
//     try {
//        await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
//        app.on("error",(error)=>{
//             console.log("Error: app is not working", error);
//             throw error;
//        });

//        app.listen(process.env.PORT, ()=>{
//         console.log(`App is listening on ${process.env.PORT}`);
//        })
//     } catch (error) {
//         console.error("Error on connection", error);
//         throw error
//     }
// })()