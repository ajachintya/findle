//express
const express=require('express');

//runnning express functions
const app=express();

//port
const port=8000;

//setting up ejs (views engine)

app.set('view engine','ejs');
app.set('views','./views');
app.use(express.urlencoded());

app.use('/',require('./router/index'));

//middleware to use static files like .cc,.js
app.use(express.static('assets'));

app.listen(port,function(err){
    if(err){
        console.log('error in running server');
    }
    console.log("Server is running on port 8000");
});