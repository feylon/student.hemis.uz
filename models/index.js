import mongoose from "mongoose";

const Student = mongoose.models.student || mongoose.model("student",  new  mongoose.Schema(
    {
        login :{type:String, unique:[true,"Foydalanuvchi mavjud"], required:true, minlength:[5,"Belgilar soni 5 tadan kam bo'lmasligi lozim"],maxlength:[15,"Belgilar soni 15tadan oshmasligi lozim"]},
        password:{type:String, required:true},
        name:{type:String, required:true},
        date_of_brith:{type:String, required:true},
        surname:{type:String, required:true},
        active:{type:Boolean, required:true},
        date_of_join:{type:String, required:true},
        phone:{type:String, required:true},
        phone1:{type:String, required:false},
        status:{type:Boolean, required:true}

     }
));

const dean = mongoose.models.dean || mongoose.model("dean", new mongoose.Schema({
    login :{type:String, unique:[true,"Xodim mavjud"], required:true, minlength:[5,"Belgilar soni 5 tadan kam bo'lmasligi lozim"],maxlength:[15,"Belgilar soni 15tadan oshmasligi lozim"]},
    password:{type:String, required:true},
    name:{type:String, required:true},
    date_of_brith:{type:String, required:true},
    surname:{type:String, required:true},
    active:{type:Boolean, required:true},
    date_of_join:{type:String, required:true},
    phone:{type:String, required:true},
    phone1:{type:String, required:false},
    status:{type:Boolean, required:true}
}));



const Teacher = mongoose.models.teacher || mongoose.model("teacher", new mongoose.Schema(
    {
        login :{type:String, unique:[true,"O'qituvchi mavjud mavjud"], required:true, minlength:[5,"Belgilar soni 5 tadan kam bo'lmasligi lozim"],maxlength:[15,"Belgilar soni 15tadan oshmasligi lozim"]},
        password:{type:String, required:true},
        name:{type:String, required:true},
        date_of_brith:{type:String, required:true},
        surname:{type:String, required:true},
        active:{type:Boolean, required:true},
        date_of_join:{type:String, required:true},
        phone:{type:String, required:true},
        phone1:{type:String, required:false},
        status:{type:Boolean, required:true}
    }
));






const Classroom = mongoose.models.classroom || mongoose.model("classroom", new mongoose.Schema(
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
        classroom:{
            type:mongoose.Schema.ObjectId,
            ref:"classroom"
        }

    }
    ));

const subject = mongoose.models.subject || mongoose.model("subject", new mongoose.Schema({
    name:{type:String, required:true},
    description:{type:String, required:true},
    teacher:{type:mongoose.Schema.ObjectId, required:true}
}));


const Timetable = mongoose.models.Timetable || mongoose.model("Timetable", new mongoose.Schema({
    subject:{
        type:mongoose.Schema.ObjectId,
        ref:"subject",
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



const result_by_day = mongoose.models.result_by_day || mongoose.model("result_by_day", new mongoose.Schema(
    {
        subject:{type:mongoose.Schema.ObjectId, ref:"subject", required:true},
        teacher:{type:mongoose.Schema.ObjectId, ref:"teacher", required:true},
        time:{type:String, required:true},
        mark:{type:Number, required:true},
        student:{type:mongoose.Schema.ObjectId,required:true}
    }
    ));


const Attendance = mongoose.models.attendance || mongoose.model("attendance", new mongoose.Schema(
    {
        student:{type:mongoose.Schema.ObjectId,
        ref:"student", required:true},
        teacher:{type:mongoose.Schema.ObjectId, ref:"teacher"},
        status:{type:Boolean, required:true},
        description:{type:String, default:"Sababsiz"}
    }
));


const resource_subject = mongoose.models.resource_subject || mongoose.model("resource_subject", new mongoose.Schema(
    {
        classroom:{type:mongoose.Schema.ObjectId, ref:"classroom", required:true},
        teacher:{type:mongoose.Schema.ObjectId, ref:"teacher", required:true},
        subject:{type:mongoose.Schema.ObjectId, ref:"subject"},
        time:{type:String, required:true},
        size:{type:String, required:true},
        description:{type:String, required:true},
        url:{type:String, required:true}
    }
));


const last_login_student = mongoose.models.last_login_student || mongoose.model("last_login_student", new mongoose.Schema({
    IP:{type:String, required:true},
    active:{type:Boolean, required:true},
    time:{type:String, required:true},
    student:{type:mongoose.Schema.ObjectId, ref:"student", required:true}
}));


const last_login_teacher = mongoose.models.last_login_teacher || mongoose.model("last_login_teacher", new mongoose.Schema({
    IP:{type:String, required:true},
    active:{type:Boolean, required:true},
    time:{type:String, required:true},
    student:{type:mongoose.Schema.ObjectId, ref:"teacher", required:true}
}));


const last_login_dean = mongoose.models.last_login_dean || mongoose.model("last_login_dean", new mongoose.Schema({
    IP:{type:String, required:true},
    active:{type:Boolean, required:true},
    time:{type:String, required:true},
    student:{type:mongoose.Schema.ObjectId, ref:"dean", required:true}
}));

const test = mongoose.model("test", new mongoose.Schema(
{
    baho:{type:Number, min:[0, "0dan kichkina baho yo'q"], max:[5, "5dan katta baho yo'q"]},


}));

export { Student, dean, Teacher, Classroom, Classroom_Student,
    subject, Timetable, result_by_day, Attendance, resource_subject,
    last_login_dean, last_login_student, last_login_teacher
}