const mongoose = require("mongoose");


const CommentModel = mongoose.Schema({

    postId : { type : mongoose.Schema.Types.ObjectId},
    comments : {
        type : [{content : {type : String},createdAt : {type : String},userId : { type : mongoose.Schema.Types.ObjectId , ref : "User" }  }],
        default : []
    }

    // content : { type : String },
    
    // ,
    // postId : { type : mongoose.Schema.Types.ObjectId , ref : "Post" }
},{timestamps : true});

module.exports = mongoose.model("Comment",CommentModel);