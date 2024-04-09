import express from "express";
import Joi from "joi";
import mongoose from "mongoose";
import http from "http";
import cors from "cors";
import dotev from "dotenv";
import { password_checker, password_generate } from "./password/index.js";

import dean from "./dean_routes/index.js";
import teacher from "./teacher_routes/middleware_Teacher.js";
dotev.config();

const app = express();
app.use(cors());
app.use(express.json())
app.use("/dean",dean);
app.use("/teacher", teacher);
const server = http.createServer(app);

// MongoDbni ulash new Date().toLocaleDateString()
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