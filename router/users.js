//fetching existing or same instace of express as it is requiring second time 
const express=require('express');
const passport=require('passport');

//create a router handlers
const router = express.Router();

const usersController=require('../controller/users_controller');

router.get('/profile/:id',passport.checkAuthentication,usersController.profile);
router.post('/update/:id',passport.checkAuthentication,usersController.update);
router.get('/signin',usersController.signin);
router.get('/signup',usersController.signup);
router.post('/create',usersController.create);

router.post('/createSession',passport.authenticate(
    'local', //strategy
    {failureRedirect:'/users/signin'},
),usersController.createSession);

router.get('/signout',usersController.destroySession);

module.exports = router;