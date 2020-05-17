const Post=require('../models/post');

module.exports.home=(req,res) => {
    Post.find({}).populate('user').exec(function(err,posts){
        return res.render('home',{
            title:"Findle",
            posts:posts
        });
    });
};