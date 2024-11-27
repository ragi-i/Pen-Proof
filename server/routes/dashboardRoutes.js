const express = require("express");
const { AllUser, RemoveAuthor, AddPost, AllPost}=require('../controllers/dashboardController');
const router = express.Router();

router.get("/allauthors", AllUser);
router.delete("/allauthors/:id",RemoveAuthor );
router.post('/addPost',AddPost );
router.get('/allPost', AllPost);


module.exports = router;