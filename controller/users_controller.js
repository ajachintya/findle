const User=require('../models/users');

module.exports.profile=(req,res) => {
     User.findById(req.params.id,function(err,user){
          return res.render('user_profile',{
               title:'User Profile',
               profile_user:user
          })
     })

}

module.exports.update=(req,res) => {
     if(req.user.id == req.params.id){
          User.findByIdAndUpdate(req.params.id,req.body,function(err,user){
               return res.redirect('back');
          });
     }else{
          return res.status(401).send('Unauthorised');
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
     req.flash('success','Logged in Successfully');

     return res.redirect('/');
};

module.exports.destroySession=(req,res) =>{
     req.logout();
     req.flash('success','Logged out Successfully');
     return res.redirect('/');
}