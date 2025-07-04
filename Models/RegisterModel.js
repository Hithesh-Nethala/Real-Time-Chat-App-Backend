var mongoose=require('mongoose');

const UserRegistration=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    number:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    avatar:{
        type:String,
        default:''
    }
})
module.exports=mongoose.model('userdetails',UserRegistration);