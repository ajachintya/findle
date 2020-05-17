//fetching existing or same instace of express as it is requiring second time 
const express=require('express');

//create a router handlers
const router = express.Router();

const postsController=require('../controller/posts_controller');

router.post('/create',postsController.create);

module.exports = router;