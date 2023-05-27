const express = require("express");
const {getAllPosts,savePost,deletePost,getLikeById} = require("../controllers/post.js");

const router = express.Router();

router.get("/all",getAllPosts);

router.post("/save",savePost);

router.get('/:postId',getLikeById)

router.delete("/delete",deletePost);

module.exports = router;