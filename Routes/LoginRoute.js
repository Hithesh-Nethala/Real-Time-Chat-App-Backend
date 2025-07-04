var express=require('express');
var router=express.Router();
const middleware=require('../middleware')
const LoginController=require('../Controllers/Auth/LoginController')

router.post('/login',LoginController.UserLogin);

router.get('/allcontacts/:id',middleware,LoginController.AllContacts)
module.exports=router;