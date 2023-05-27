const express = require("express");
const {followUser,unFollowUser} = require("../controllers/follow.js");

const router = express.Router();

router.get("/:followId/follow",followUser);

router.get("/:followId/unfollow",unFollowUser);

module.exports = router;