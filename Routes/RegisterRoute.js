var express=require('express');
var router=express.Router();
var middleware=require('../middleware');
const RegisterController=require('../Controllers/Auth/RegisterController')

router.post('/register',RegisterController.Registration);

router.get('/all',RegisterController.AllUsers);

router.get('/indv/:id',RegisterController.IndvUser)

router.post('/avatar',middleware,RegisterController.Avatar)

module.exports=router;