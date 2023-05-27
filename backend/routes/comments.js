const express = require("express");
const { getAllComments,postComment } = require("../controllers/comments");

const router = express.Router();

router.post("/add",postComment);

router.get("/:postId/all",getAllComments)

module.exports = router;