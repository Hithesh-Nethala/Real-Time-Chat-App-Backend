const MessageSchema=require('../Models/MessageModel');

const addMsg=async(req,res)=>{
    try {
        const {from,to,message}=req.body;
        const newData=new MessageSchema({
            message:message,
            users:[from,to],
            sender:from
        })
        if(newData){
            await newData.save();
            return res.status(200).json('Message Stored Successfully')
        }
        return res.status(400).json('Message Storing Failed!')
    } catch (error) {
        return res.status(500).json('Message Not Stored!')
    }
}

const getMsg=async(req,res)=>{
    try {
        const {from,to}=req.body;
        const allMsgs=await MessageSchema
        .find({
            users:{
                $all:[from,to]
            }
        })
        .sort({updatedAt:1});
        const oneToOneMsgs=allMsgs.map((msg)=>{
            return{
                fromSelf:msg.sender.toString()===from,
                message:msg.message,
                time:msg.createdAt
            }
        })
        if(!oneToOneMsgs){
            return res.status(400).json('No Messages Fetched!')
        }
        return res.status(200).json(oneToOneMsgs)
    } catch (error) {
        return res.status(500).json("Getting Messages From DB Failed!")
    }
}

module.exports={addMsg,getMsg}