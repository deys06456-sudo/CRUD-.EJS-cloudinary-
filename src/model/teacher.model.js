const mongoose=require('mongoose')
const Schema=mongoose.Schema
const TeacherSchema = new Schema ({
    Name:{
        type:String,
        required:[true,'Name is required']
    },

    Email:{
        type:String,
        required:[true,'Email is required']
    },

    Phone:{
        type:Number,
        required:[true,'Phone is required']
    },

    Address:{
        type:String,
        required:[true,'Address is required']
    },

    Salary:{
        type:Number,
        required:[true,'Salary is required']
    },

    Experience:{
        type:String,
        required:[true,'Experience is required']
    },

    Subject:{
        type:String,
        required:[true,'Subject is required']
    },
    
    Department:{
        type:String,
        required:[true,'Department is required']
    },
    
    Gender:{
        type:String,
        required:[true,'Gender is required']
    },
    
    image:{
        type:String,
        required:false,
        default:'https://cdn-icons-png.flaticon.com/512/149/149071.png'
    },

    Status:{
        type:String,
        required:[true,'Status is required']
    },

    is_deleted:{
       type:Boolean,
       default:false
   }
   
},{
    timestamps:true
})

const TeacherModel = mongoose.model('teacher',TeacherSchema)

module.exports = TeacherModel