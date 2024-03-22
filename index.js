import Express from "express";
import Joi from "joi";
import mongoose from "mongoose";
import http from "http";
import dotev from "dotenv";
import { dean } from "./models/index.js";

dotev.config();
// console.log()

const app = Express();
const server = http.createServer(app);

// MongoDbni ulash
(async()=>{
    try{
    await mongoose.connect(process.env.mongodb);

    }
    catch(error){
        console.log("MogoDBni ulashda xatolik mavjud ", error);
    }
})();


// Serverni ishga tushirish
(()=>{
    try {
        server.listen(process.env.PORT, ()=>{console.log(`Server ${process.env.PORT} portda ishga tushdi`)})
        
    } catch (error) {
        console.log("Server ishlashida muommo mavjud : ", error)
    }
})()