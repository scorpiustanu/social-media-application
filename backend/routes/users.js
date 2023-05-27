const express = require("express");
const {getUser, updateUser} = require("../controllers/user.js");

const router = express.Router();

router.get("/:userId",getUser);
router.put("/update",updateUser)

module.exports = router;