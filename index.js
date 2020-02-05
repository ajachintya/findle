//express
const express=require('express');

//runnning express functions
const app=express();

//port
const port=8080;

app.listen(port,function(err){
    if(err){
        console.log('error in running server');
    }
    console.log("Server is running on port 8080");
});