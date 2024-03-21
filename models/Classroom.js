import mongoose from "mongoose";
import Teacher from "./Teacher.js";
import Classroom_Student from "./Classroom_student.js";

const Classroom = mongoose.models.classrom || mongoose.model("classroom", new mongoose.Schema(
{
    section:{type:String,required:true},
    grade:{type:Number, required:true},
    teacher:{type:mongoose.Schema.ObjectId, required:true, ref:"teacher"},
    name:{type:String, required:true}
}
    ));


export default Classroom;