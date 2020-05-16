//express
const express=require('express');

//runnning express functions
const app=express();

//port
const port=8000;

const expressLayouts=require('express-ejs-layouts');

const db=require('./config/mongoose');

const cookieParser = require('cookie-parser');
// used for session cookie
const session=require('express-session');
const passport = require('passport');
const passportLocal=require('./config/passport-local-strategy');
const MongoStore=require('connect-mongo')(session);

app.use(cookieParser());
app.use(express.urlencoded());

//middleware to use static files like .cc,.js
app.use(express.static('assets'));

app.use(expressLayouts);

app.set('layout extractStyles',true);
app.set('layout extractScripts',true);

//setting up ejs (views engine)
app.set('view engine','ejs');
app.set('views','./views');



app.use(session({
    name:'findle',
    //todo change the secret before deployment in production
    secret:'blahsomthing',
    saveUninitialized:false,
    resave:false,
    cookie:{
        maxAge:(1000*60*100)
    },
    store:new MongoStore({
        mongooseConnection: db,
        remove:'disabled'
    },
    function(err){
        console.log(err || 'connect mongodb setup ok');
    }    
    )
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);

app.use('/',require('./router'));

app.listen(port,function(err){
    if(err){
        console.log('error in running server');
    }
    console.log("Server is running on port 8000");
});