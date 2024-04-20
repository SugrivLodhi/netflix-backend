import express from 'express'
import dbConection from './utils/dbConnection.js'
import { registerUser, userLogin } from './controller/user.js'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
const app = express()
const port = 8080
dbConection().then((v)=>{
  console.log("db connected")
}).catch((v)=>{
console.log("failed to connect")
})
app.use(express.urlencoded({ extended: true }))
app.use(express.json());   
app.use(cookieParser())
app.get('/',(req,res)=>{
    res.send("Hello World")
})
app.post('/register',registerUser)
app.post('/login',userLogin)
app.listen(port,()=>{
    console.log("listen at port 8000")
})