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




const Teacher = mongoose.models.teacher || mongoose.model("teacher", new mongoose.Schema(
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






const Classroom = mongoose.models.classrom || mongoose.model("classroom", new mongoose.Schema(
    {
        section:{type:String,required:true},
        grade:{type:Number, required:true},
        teacher:{type:mongoose.Schema.ObjectId, required:true, ref:"teacher"},
        name:{type:String, required:true}
    }
        ));

        

const Classroom_Student = mongoose.models.Classroom_Student || mongoose.model("Classroom_Student", new mongoose.Schema(
    {
        student:{
                type:mongoose.Schema.ObjectId,
                ref:"student",
                required:true                
                },
        classrom:{
            type:mongoose.Schema.ObjectId,
            ref:"classroom"
        }

    }
    ));

const Subject = mongoose.model("Subject", new mongoose.Schema({
    name:{type:String, required:true},
    description:{type:String, required:true}
}));


const Timetable = mongoose.model("Timetable", new mongoose.Schema({
    subject:{
        type:mongoose.Schema.ObjectId,
        ref:"Subject",
        required:true
    },
    day:{
        type:String,
        required:true
    },
    time:{
        type:String,
        required:true
    },
    teacher:{
        type:mongoose.Schema.ObjectId,
        ref:"teacher"
    },
    Classroom_Student:{
        type:mongoose.Schema.ObjectId,
        ref:"Classroom_Student"
    },
    Classroom:{
        type:mongoose.Schema.ObjectId,
        ref:"classroom"
    }
}));     



const result_by_day =  mongoose.model("result_by_day", new mongoose.Schema(
    {
        subject:{type:mongoose.Schema.ObjectId, ref:"Subject", required:true},
        teacher:{type:mongoose.Schema.ObjectId, ref:"teacher", required:true},
        time:{type:String, required:true},
        mark:{type:Number, required:true},
        student:{type:mongoose.Schema.ObjectId,required:true}
    }
    ));


const Attendance = mongoose.model("attendance", new mongoose.Schema(
    {
        student:{type:mongoose.Schema.ObjectId,
        ref:"student", required:true},
        teacher:{type:mongoose.Schema.ObjectId, ref:"teacher"},
        status:{type:Boolean, required:true},
        description:{type:String, default:"Sababsiz"}
    }
));

