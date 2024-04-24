// require('dotenv').config({path:'./env'})

import dotenv from 'dotenv';
import connectDB from "./db/index.js";
import { app } from './app.js';

dotenv.config({
    path:'./env'
})

connectDB()
.then(()=>{
    app.listen(process.env.PORT || 8000,()=>{
        console.log(`server is runnning at port:${process.env.PORT}`);
    })
})
.catch((error)=>{
  console.log("MongoDB connection failed !!!",error);
})
















// import express from "express";
// const app = express()
// ;(async()=>{
//     try {
//       await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
//       app.on("error",(error)=>{
//             console.log("ERROR:-",error);
//             throw error
//       })
//     } catch (error) {
//         console.error("Error:-",error)
//         throw error
//     }
// })()