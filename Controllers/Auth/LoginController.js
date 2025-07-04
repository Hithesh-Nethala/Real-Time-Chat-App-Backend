const UserRegistration=require('../../Models/RegisterModel');
var dotenv=require('dotenv');
dotenv.config();
const bcrypt=require('bcrypt');
var jwt=require('jsonwebtoken');
const UserLogin=async(req,res)=>{
    try {
        const {email,password}=req.body;
        let exist=await UserRegistration.findOne({email});
        if(!exist){
            return res.status(400).json('User Mail Not Found!')
        }
        if(!bcrypt.compare(password,exist.password)){
            return res.status(400).json('Password Incorrect!')
        }
        let payload={
            user:{
                id:exist._id
            }
        }
        jwt.sign(payload,process.env.JWT_KEY,{expiresIn:'3h'},
            (err,token)=>{
                if(err){return res.status(400).json('Token Creation Failed')}
                return res.status(200).json({token,exist,message:'Login Successfull'});
            }
        )
    } catch (error) {
        return res.status(500).json('Login Failed!')
    }
}

const AllContacts=async(req,res)=>{
    try {
        const userid=req.params.id;
        const exist=await UserRegistration.find({_id:{$ne:userid}}).select([
            "name",
            "avatar",
            "_id"
        ])
        if(!exist){
            return res.status(400).json("No Contacts Found!")
        }
        return res.status(200).json(exist);
    } catch (error) {
        return res.status(500).json("Getting Contacts Failed!")
    }
}

module.exports={UserLogin,AllContacts};
