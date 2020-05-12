const mongoose=require('mongoose');

mongoose.connect('mongodb://localhost/findle_development');

const db=mongoose.connection;

db.on('error', console.error.bind(console,"Error in connecting to mongodb"));

db.once('open',function(){
    console.log('connected to Database');
});

module.exports = db;