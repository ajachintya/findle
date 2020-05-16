const User=require('../models/users');

module.exports.profile=(req,res) => {
    if(req.cookies.user_id){
          User.findById(req.cookies.user_id,function(err,user){
               if(user){
                    
                    return res.render('user_profile',{
                         title:"User Profile",
                         user:user
                    })
               }
               return res.redirect('/users/signin');
          });
    }else{
         return res.redirect('/users/signin');
    }
}

module.exports.signin=(req,res) => {
     if(req.isAuthenticated()){
          return res.redirect('/users/profile');
     }
     return res.render('user_sign_in');
}

module.exports.signup=(req,res) => {
     if(req.isAuthenticated()){
          return res.redirect('/users/profile');
     }
     return res.render('user_sign_up');
}

module.exports.create=(req,res) => {
     if(req.body.password != req.body.confirm_password){
          return res.redirect('back');
     }

     User.findOne({email:req.body.email},(err,user) => {
          if(err){console.log("error in finding user in sign-up"); return}

          if(!user){
               User.create(req.body, function(err,user){
                    if(err){console.log('error in creating user while signing up'); return}

                    return res.redirect('/users/signin');
               })
          }
          else{
              return res.redirect('back');
          }
     });
};

module.exports.createSession = function(req,res){

    
     return res.redirect('/users/profile');

};

module.exports.destroySession=(req,res) =>{
     req.logout();
     return res.redirect('/');
}