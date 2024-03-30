import { Router } from "express";
import mongoose from "mongoose";
import { Teacher, Timetable, Attendance } from "../models/index.js";
import Joi from "joi";
import { password_checker } from "../password/index.js";
import token from "../dean_routes/middleware_Dean.js";

const router = Router();


// login

router.post("/login", async (req, res) =>{
const LoginSchema = Joi.object({
    login: Joi.string().max(15).required(),
    password:Joi.string().max(15).required()
});

const validatecheck = LoginSchema.validate(req.body);
if(validatecheck.error)
    return res.status(400).send(validatecheck.error.message);
const {login, password} = req.body;

const data = await Teacher.findOne({login}).select("login password");
console.log(data);
if(!data)
return res.status(401).send(`Login yoki parol xato`);

const check_auth = await password_checker(password, data.password);
if(!check_auth)
return res.status(401).send(`Login yoki parol xato`);



res.status(200).send({token : data._id});
});

// Dars jadvalni ro'yxatini olish, o'qituvchiga tegishlarini 
router.get("/timetable/:id", token, async ( req, res)=>{
//    "65fea57a48bdc2255e149b7b"
   const data = await Timetable.find({"teacher":req.params.id})
   .select("-teacher")
   .populate("Classroom_Student");
    res.status(200).send(data)
});

// Davomatni olish bir nechta talabalarni olish

router.post("/attendance", token, async (req, res)=>{
const ValidateSchema = Joi.array().items(
    Joi.object({
        student : Joi.string().required().max(50),
        subject : Joi.string().required().max(50),
        teacher : Joi.string().required().max(50),/// Bu yerda tokendagi teacherning IDni qo'yiladi
        timetable:Joi.string().required().max(50),
        status  : Joi.boolean().required()
        })        
);
const validatecheck = ValidateSchema.validate(req.body);
if(validatecheck.error) 
return res.status(400).send(validatecheck.error.message);
try {
     await Attendance.insertMany(req.body);
     return res.status(201).send({created:true})

} catch (error) {
    console.log(error)
    res.status(500).send("Saqlashda ko'zda tutilmagan xatolik chiqdi")
}


})
// Hali davom etadi ....

export default router;