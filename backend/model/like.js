const mongoose = require("mongoose");

const LikeModel = mongoose.Schema({
    postId : { type : mongoose.Schema.Types.ObjectId ,ref : "Post" },
    userId : {
        type : [mongoose.Schema.Types.ObjectId],
        ref : "User",
        default : []
    }
});

module.exports = mongoose.model("Like",LikeModel);