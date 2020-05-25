//fetching existing or same instace of express as it is requiring second time 
const express=require('express');

//create a router handlers
const router = express.Router();

const passport=require('passport');

const commentsController=require('../controller/comments_controller');

router.post('/create',passport.checkAuthentication,commentsController.create);
router.get('/destroy/:id',passport.checkAuthentication,commentsController.destroy);
module.exports = router;