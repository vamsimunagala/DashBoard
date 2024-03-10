const conn=require("./connection");
const express=require("express");
const app=express();

app.listen(8000,function(){
    console.log("server running!!");
})

app.get("/",async(req,res)=>{
    res.send("h")
})