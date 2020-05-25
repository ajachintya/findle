const Comment=require('../models/comment');
const Post=require('../models/post');   

module.exports.create= async (req,res) => {    
    try{
        let post = await Post.findById(req.body.post);
    if(post){
        let comment = await Comment.create({
        content:req.body.content,
        post:req.body.post,
        user:req.user._id
    });
    post.comments.push(comment);
    post.save();
    req.flash('success','Comment created Successfully');
    return res.redirect('/');
}

}catch(err){
    console.log("error",err);
}
};

module.exports.destroy= async (req,res) => {
   try{
    let comment = await Comment.findById(req.params.id);

    // if(comment.user == req.user.id){
             let postid=comment.post;
             comment.remove();
         await Post.findByIdAndUpdate(postid,{$pull:{comments:req.params.id}});   
         req.flash('success','Comment deleted Successfully');
         return res.redirect('back');
   }catch(err){
    console.log("error",err);
   }    
}