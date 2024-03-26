import { Router } from "express";
import { password_checker, password_generate } from "../password/index.js";
import mongoose from "mongoose";
import { Dean, Teacher, Student, subject,  Classroom_Student, Classroom,
    Timetable
} from "../models/index.js";
import Joi from "joi";
import token from "./middleware_Dean.js";

const router = Router();

    
// login
router.post("/login",  async (req, res)=>{
    const LoginSchema = Joi.object({
        login: Joi.string().required(),
        password:Joi.string().required()
    });
    const login_status = LoginSchema.validate(req.body);

    if(login_status.error){
        res.status(400).send(login_status.error.message);
        return;
    }
    const {login, password} = req.body;
    const data = await Dean.findOne({login})
    .select("login password")
    ;
    console.log(data)
    if(!data) {
         res.status(401).send("Login yoki parol xato");
         return;
    }
    const check_auth = await password_checker(password, data.password);
    if(!check_auth){
        res.status(401).send("Login yoki parol xato");
         return;
    }
    console.log(data._id);
return res.status(200).send({"token":data._id} );

});



// O'qituvchi qo'shish

router.post("/add_teacher",token, async(req, res)=>{
    const AddTeacherSchema = Joi.object({
        login:Joi.string().required().min(5).max(15),
        password:Joi.string().required().min(5).max(15),
        name:Joi.string().required().min(3).max(15),
        date_of_brith:Joi.string().required(),
        surname:Joi.string().required().min(3).max(15),
        active:Joi.boolean().required(),
        phone:Joi.string().min(9).max(13).required(),
        status:Joi.boolean().required()
    });
 const teacherstatus = AddTeacherSchema.validate(req.body);
 if(teacherstatus.error) return res.status(400).send(teacherstatus.error.message);
const hash = await password_generate(req.body.password);
req.body.password = hash;
const teacher = new Teacher(req.body);

try {
    await teacher.save();
    res.status(201).send({save:"saqlandi"})
} catch (error) {
    console.log(error)
    if(error.code == 11000)
    return res.status(403).send(`"${req.body.login}" avval ro'yxatdan o'tgan!`);
    
}

});


// Talabani qo'shish

router.post("/add_student",token, async(req, res)=>{
    const AddStudentSchema = Joi.object({
        login:Joi.string().required().min(5).max(15),
        password:Joi.string().required().min(5).max(15),
        name:Joi.string().required().min(3).max(15),
        date_of_brith:Joi.string().required(),
        surname:Joi.string().required().min(3).max(15),
        active:Joi.boolean().required(),
        phone:Joi.string().min(9).max(13).required(),
        status:Joi.boolean().required()
    });
 const studentstatus = AddStudentSchema.validate(req.body);
 if(studentstatus.error) return res.status(400).send(studentstatus.error.message);
const hash = await password_generate(req.body.password);
req.body.password = hash;
const student = new Student(req.body);

try {
    await student.save();
    res.status(201).send({save:"saqlandi"})
} catch (error) {
    console.log(error)
    if(error.code == 11000)
    return res.status(403).send(`"${req.body.login}" avval ro'yxatdan o'tgan!`);
    
}

});

// Yangi fan qo'shish
router.post("/add_subject", token, async (req, res)=>
{
const SubjectValidate = Joi.object({
    name: Joi.string().min(3).max(10).required(),
    description: Joi.string().min(5).max(200).required(),
    teacher:Joi.string().required()
});
    const validateCheck = SubjectValidate.validate(req.body);
    if(validateCheck.error) return res.status(400).send(validateCheck.error.message);

    try {
        const Subject = new subject(req.body);
        await Subject.save();
        return res.status(201).send({created:true});

    } catch (error) {
        if(error.code == 11000)
    return res.status(403).send(`"${req.body.name}" darsliklar ro'yxatida mavjud!`);
    else
        {
        console.log("subjectni saqlashda xatolik mavjud ", error);

        }
}

});





// Guruhni hosil qilish
router.post("/add_student_group", token, async (req, res)=>{
const Schema = Joi.object(
    {
        student:Joi.string().required(),
        // classroom:Joi.string().required(),
        name:Joi.string().min(3).max(10).required()
    }
    );
    const validateCheck = Schema.validate(req.body);
    if(validateCheck.error) return res.status(400).send(validateCheck.error.message);
    
    const classroom_student = new Classroom_Student(req.body);
    try{
        await classroom_student.save();
        return res.status(201).send({created:true});

    }
    catch(error){
        if(error.code == 11000)
        return res.status(403).send(`"${req.body.name}" guruhlar ro'yxatida mavjud!`);
        else
            {
            console.log("Guruhni saqlashda xatolik mavjud ", error);
    
            }
    }
});

// Darsga bog'langan guruhni hosil qilish 

router.post("/add_subject_classroom", token, async(req, res)=>{
    const Schema = Joi.object({
        section:Joi.string().min(3).max(15).required(),
        grade:Joi.number().required(),
        teacher:Joi.string().required(),
        name:Joi.string().min(3).max(15).required(),
        classroom:Joi.string().required()

    });
    const validateCheck = Schema.validate(req.body);
    if(validateCheck.error) return res.status(400).send(validateCheck.error.message);

    const classroom = new Classroom(req.body);
    try {
        await classroom.save();
        return res.status(201).send({created:true});
    } catch (error) {
        console.log(error)
       return res.status(403).send(`Darsga bog'langan guruhni saqlashda xatolikga uchradi : "${error._message}"`);
    }
});

// Dars jadvalni qo'shish

router.post("/add_timetable", token, async (req, res)=>{
  const Schema = Joi.object(
    {
        subject:Joi.string().min(25).required(),
        day:Joi.string().required(),
        time:Joi.string().required(),
        teacher:Joi.string().min(25).required(),
        Classroom_Student:Joi.string().min(25).required()
    }
  );
  const validateCheck = Schema.validate(req.body);
  if(validateCheck.error) return res.status(400).send(validateCheck.error.message);

    const timetable = new Timetable(req.body);
    try{
        await timetable.save();
    }
    catch(error){
        console.log(error)
        return res.status("500").send("Dars jadvalni saqlashda xatolikga uchradi");
        

    }

})



export default router;