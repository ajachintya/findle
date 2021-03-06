//fetching existing or same instace of express as it is requiring second time 
const express=require('express');

//create a router handlers
const router = express.Router();

const passport=require('passport');

const postsController=require('../controller/posts_controller');

router.post('/create',passport.checkAuthentication,postsController.create);
router.get('/destroy/:id',passport.checkAuthentication,postsController.destroy);
module.exports = router;