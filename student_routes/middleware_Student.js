import { Router } from "express";
import Joi from "joi";
import token from "../dean_routes/middleware_Dean";
import { password_checker } from "../password";
import token from "../dean_routes/middleware_Dean";
import { Student } from "../models";

const router = Router();

router.post("/login", async()=>{

})