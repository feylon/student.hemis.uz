import mongoose from "mongoose";
import Student from "./Student.js";


const Classroom_Student = mongoose.model("Classroom_Student", new mongoose.Schema(
    {
        student:{
                type:mongoose.Schema.ObjectId,
                ref:"student",
                required:true                
                },
        name:    {
                type:String,
                required:true
                },

    }
    ));

    export default Classroom_Student;