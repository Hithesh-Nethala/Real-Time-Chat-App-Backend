var express=require('express');
var mongoose=require('mongoose');
var dotenv=require('dotenv');
dotenv.config();
var {createServer}=require('http');
var {Server}=require('socket.io')
var cors=require('cors');
var registerrouter=require('./Routes/RegisterRoute');
var loginrouter=require('./Routes/LoginRoute')
var messagerouter=require('./Routes/MessageRoute')
var app=express();

app.use(express.json())
app.use(cors({origin:'*'}))

mongoose.connect(process.env.MONGO_URL)
.then(()=>console.log('DataBase Connected...'))
.catch(()=>console.log('DataBase Connection Failed!'))

app.get('/',(req,res)=>{
    res.send('Server Up And Running!')
})

app.use('/user',registerrouter);

app.use('/user',loginrouter)

app.use('/message',messagerouter);


const httpServer=createServer(app);

const io=new Server(httpServer,{
    cors:{
        origin:"http://localhost:3000",
        credentials:true
    }
})

global.onlineUsers=new Map();

io.on("connection",(socket)=>{

    global.chatUser=socket;

    socket.on("add-user",(userid)=>{
        onlineUsers.set(userid,socket.id);
    });

    socket.on("send-msg",(data)=>{
        const sendUserSocket=onlineUsers.get(data.to);
        if(sendUserSocket){
            socket.to(sendUserSocket).emit("msg-receive",data.msg)
        }
    });
})

const port=process.env.PORT;
httpServer.listen(port,()=>console.log('Server Running...'))