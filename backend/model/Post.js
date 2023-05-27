const mongoose = require("mongoose");

const PostModel = mongoose.Schema({
    desc : {type : String},
    url : {type : String},
    createdAt : {type : String},
    userId : {type : mongoose.Schema.Types.ObjectId , ref : "User" }
},{timestamps : true});

module.exports = mongoose.model("Post",PostModel);