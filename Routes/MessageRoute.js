const express=require('express');
const router=express.Router();
const MessagesController=require('../Controllers/MessagesController');

router.post('/adding',MessagesController.addMsg);

router.post('/getting',MessagesController.getMsg)
module.exports=router;