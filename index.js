import express from 'express'
import dbConection from './utils/dbConnection.js'
import { logout, registerUser, userLogin } from './controller/user.js'
import cookieParser from 'cookie-parser'
import cors from 'cors'
const app = express()
const port = 8080
dbConection().then((v)=>{
  console.log("db connected")
}).catch((err)=>{
console.log("failed to connects",err)
})

app.use(express.urlencoded({ extended: true }))
app.use(express.json());   
app.use(cookieParser())

app.use(cors({ credentials: true, origin: true }));

app.get('/',(req,res)=>{
    res.send("Hello World")
})
app.post('/register',registerUser)
app.post('/login',userLogin)
app.get('/logout',logout)
app.listen(port,()=>{
    console.log(`listen at port ${port}`)
})