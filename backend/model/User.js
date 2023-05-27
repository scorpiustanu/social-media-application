const mongoose = require("mongoose");

const UserModel = mongoose.Schema({
    username : {type : String, unique : true},
    name : { type : String },
    email : { type : String,unique : true },
    password : {type : String },
    coverPic : {type : String,default : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"},
    profilePic : {type : String,default : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"},
    about : {type : String}
},{timestamps : true});

 module.exports = mongoose.model("User",UserModel);