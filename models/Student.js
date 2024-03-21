import mongoose from "mongoose";

const Student = mongoose.models.student || mongoose.model("student", new mongoose.Schema(
    {
        login :{type:String, unique:true, required:true},
        password:{type:String, required:true},
        name:{type:String, required:true},
        date_of_brith:{type:String, required:true},
        surname:{type:String, required:true},
        active:{type:Boolean, required:true},
        date_of_join:{type:String, required:true},
        phone:{type:String, required:true},
        phone1:{type:String, required:false}


    }
));

export default Student;