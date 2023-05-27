const mongoose = require("mongoose");

const relationModel = mongoose.Schema({
    userId : { type : mongoose.Schema.Types.ObjectId , ref : "User"},
    followers : {
        type : [mongoose.Schema.Types.ObjectId],
        ref : "User",
        default : []
    } 
},{timestamps : true});

module.exports = mongoose.model("Relationship",relationModel);