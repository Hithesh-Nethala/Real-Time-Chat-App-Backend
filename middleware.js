var jwt=require('jsonwebtoken')
var dotenv=require('dotenv')
dotenv.config();
module.exports= function (req,res,next){
    try {
        const token= req.header('x-token')
        if(!token){
            return res.status(400).json('Token Not Found!')
        }
        let decode=jwt.verify(token,process.env.JWT_KEY);
        req.user=decode.user;
        next();
    } catch (error) {
        return res.status(500).json('Token Expired or Not Gotten!')
    }
}