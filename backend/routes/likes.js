const express = require("express");
const { increaseLike, deleteLike, getAllLikes } = require("../controllers/like");

const router = express.Router();

router.post("/like",increaseLike);
router.post("/dislike",deleteLike);
router.post("/likes",getAllLikes);

module.exports = router;