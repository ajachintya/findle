const Post=require('../models/post');
const Comment=require('../models/comment');

module.exports.create= async (req,res) => {    
   try{
    let post=await Post.create({
        content:req.body.content,
        user: req.user._id 
        
    });
    req.flash('success','Posted Successfully');
    if(req.xhr){
        return res.status(200).json({
            data:{
                post:post
            },
            message:"Post created!"
        });
    }
    
    return res.redirect('back');

   }catch(err){
        console.log('error',err);
        return;
   }
};

module.exports.destroy= async function(req,res){
   try{
    let post=await Post.findById(req.params.id);

    //.id means converting the object id i.e _id into string
    
       if(post.user==req.user.id){
        post.remove();

       await Comment.deleteMany({post:req.params.id});

        if(req.xhr){
            return res.status(200).json({
                data:{
                    post_id:req.params.id
                },
                message:"Post deleted!"
            })
        }

       req.flash('success','Post deleted Successfully');
       return res.redirect('back');
       }else{
        return res.redirect('back');
        
               }
   }catch(err){
       console.log('error',err);
   }
   
}