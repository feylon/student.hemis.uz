import { Router } from "express";
import { password_checker } from "../password/index.js";
import mongoose from "mongoose";
import { Dean } from "../models/index.js";
import Joi from "joi";

const router = Router();

router.post("/login", async (req, res)=>{
    const LoginSchema = Joi.object({
        login: Joi.string().required(),
        password:Joi.string().required()
    });
console.log(req.body)
    const login_status = LoginSchema.validate(req.body);

    if(login_status.error){
        res.status(400).send(login_status.error.message);
        return;
    }
    const {login, password} = req.body;
    const data = await Dean.find({login})
    .select("login password -_id")
    ;
    if(data.length == 0) {
         res.status(401).send("Login yoki parol xato");
         return;
    }
    const check_auth = await password_checker(password, data[0].password);
    if(!check_auth){
        res.status(401).send("Login yoki parol xato");
         return;
    }
return res.status(200).send("token");

});







export default router;