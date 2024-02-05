const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");



mongoose.connect("mongodb://localhost:27017/AniiDb")
.then(()=>{console.log("Database successfully connected")});


// Mongoose schema
const registerUserSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String
});


const Registration = mongoose.model("Registration",registerUserSchema);




const app =  express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())



app.get("/",(req,res)=>{
    console.log(__dirname)
    res.sendFile(__dirname+"/pages/index.html");
})

app.get("/success",(req,res)=>{
    console.log(__dirname)
    res.sendFile(__dirname+"/pages/success.html");
})

app.get("/error",(req,res)=>{
    console.log(__dirname)
    res.sendFile(__dirname+"/pages/error.html");
})


app.post("/register",async (req,res)=>{
   
    
        const {name,email,password} = req.body;
        const existingUser = await Registration.findOne({email:email});
        if(!existingUser){
            const resitrationData = new Registration({
                name,
                email,
                password
            })
            resitrationData.save();
            res.redirect("/success");
        }
        else{
                res.redirect("/error");
        }
    
  
});


app.listen(3000,()=>{
    console.log("Server is running at port number 3000")
});
