const mongoose = require("mongoose");

const StoryModel = mongoose.Schema({
    userId : { type : mongoose.Schema.Types.ObjectId , ref : "User" },
    videoUrl : { type : String }
},{timestamps : true});

module.exports = mongoose.model("Story",StoryModel);