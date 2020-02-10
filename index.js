//express
const express=require('express');

//runnning express functions
const app=express();

//port
const port=8000;

const expressLayouts=require('express-ejs-layouts');


app.use(express.urlencoded());

//middleware to use static files like .cc,.js
app.use(express.static('assets'));

app.use(expressLayouts);

app.set('layout extractStyles',true);
app.set('layout extractScripts',true);

//setting up ejs (views engine)
app.set('view engine','ejs');
app.set('views','./views');

app.use('/',require('./router/index'));

app.listen(port,function(err){
    if(err){
        console.log('error in running server');
    }
    console.log("Server is running on port 8000");
});