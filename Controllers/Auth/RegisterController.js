var bcrypt=require('bcrypt')
var validator=require('validator')
var UserRegistration=require('../../Models/RegisterModel');

const Registration=async(req,res)=>{
    try {
        const {name,email,number,password}=req.body;
        let exist=await UserRegistration.findOne({email});
        if(exist){
            return res.status(400).json('User Email Exist!')
        }
        if(!validator.isEmail(email)){
            return res.status(400).json('Email invalid')
        }
        const hash_pass=await bcrypt.hash(password,10)
        const newData=new UserRegistration({name,email,number,password:hash_pass});
        await newData.save();
        if(newData){
            return res.status(200).json('Registration Successfull')
        }

    } catch (error) {
        return res.status(500).json('Registration Failed.')
    }
}

const AllUsers=async(req,res)=>{
    try {
        let exist=await UserRegistration.find();
        if(!exist){
            return res.status(400).json('No Participants Found!')
        }
        return res.status(200).json(exist);
    } catch (error) {
        return res.status(500).json('Getting All Participants Failed!')
    }
}

const IndvUser=async(req,res)=>{
    try {
        let exist=await UserRegistration.findById(req.params.id).select([
            "name",
            "avatar",
            "email",
            "number"
        ])
        if(!exist){
            return res.status(400).json('No Participants Found!')
        }
        return res.status(200).json(exist)
    } catch (error) {
        return res.status(500).json('Getting Indv Participants Failed!')
    }
}

const Avatar=async(req,res)=>{
    try {
        const {image_url,ownerid}=req.body
        let exist=await UserRegistration.findById(ownerid)
        if(!exist){
            return res.status(400).json('Authentication Required!')
        }
        if(!image_url){
            return res.status(400).json('No Image Url Found')
        }
        exist.avatar=await image_url
        await exist.save()
        return res.status(200).json('Avatar Updated Sucessfully');
    } catch (error) {
        return res.status(500).json('Storing Avatar Failed!')
    }
}
module.exports={Registration,AllUsers,IndvUser,Avatar}