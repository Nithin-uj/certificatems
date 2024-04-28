import express from 'express';
import cors from 'cors';
import mysql, { createConnection } from 'mysql';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt'
import cookieParser from 'cookie-parser'
const salt = 10;
const PORT = 8090;
const app = express();
app.use(cors({
    origin : ['http://localhost:3000'],
    methods : ['POST','GET'],
    credentials : true
}));
app.use(express.json());
app.use(cookieParser());

const db = mysql.createConnection({
    host : "localhost",
    user : "root",
    password : "Nithin@20",
    database : "certificatems"
});

db.connect((err)=>{
    if(err){
        console.log("Error while connection to database");
        return
    }
    console.log("Connected to database");
})

const verifyUser = (req,res,next)=>{
    const token = req.cookies.token;
    if(!token){
        res.json({Error : "You are not verified"});
    }
    else{
        jwt.verify(token,"jwt-secret-key",(err,decoded)=>{
            if(err){
                return res.json({Error : "Token is not ok"})
            }
            else{
                req.email = decoded.mail;
                next();
            }
        })
    }
}

app.get("/",verifyUser,(req,res)=>{
    return res.json({Status : "Success",email : req.email})
})

app.get("/logout",(req,res)=>{
    res.clearCookie('token');
    return res.json({status : "Success"})
})

app.post('/login',(req,res)=>{
    const sql = "SELECT * FROM admin where Email=?";
    db.query(sql,[req.body.email],(err,data)=>{
        if(err) return res.json({Message : "Something Went Wrong!"});
        if(data.length>0){
            bcrypt.compare(req.body.password.toString(),data[0].Password,(err,response)=>{
                if(err) return res.json({Message : "Something Went Wrong!!"});
                if(response){
                    const mail = data[0].Email;
                    const token = jwt.sign({mail},"jwt-secret-key",{expiresIn:'1D'})
                    res.cookie('token',token);
                    return  res.json({Message : "Success"})
                } 
                else{
                    return res.json({Message : "Wrong Password"})
                }
            })
        }
        else{
            return res.json({Message : "Email not registered"})
        }
    })
})

app.post('/register',(req,res)=>{
    const sql = "INSERT INTO admin (Name,Email,Password) values (?)";
    bcrypt.hash(req.body.password.toString(),salt,(err,hashed)=>{
        if(err){
            console.log("Error While Hashing");
        }
        const val = [
            req.body.name,
            req.body.email,
            hashed
        ]
        db.query(sql,[val],(err,result)=>{
            if(err) return res.json({err});
            return res.json({Status : "Success"})
        })
    })
})

app.listen(8090,()=>{
    console.log(`Listening in ${PORT}`)
})
