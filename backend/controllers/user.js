const User = require("../model/User.js");

const getUser = async (req,res) => {
    try {
        let {userId} = req.params;
        
        let user = await User.findOne({_id : userId});

        if(!user)
            return res.status(404).json("user not found");

        console.log(user);
        return res.status(200).json(user);

    } catch (error) {
        res.status(500).json(error);
    }
}

const updateUser = async (req,res) => {
    try {
        console.log(req.body.about);
        let {userId,about,coverPic,profilePic,name} = req.body;
        console.log(userId);
        console.log(about);
        console.log(coverPic);
        console.log(profilePic);
        console.log(name);

        // let id = mongoose.Types.ObjectId(userId)
        // console.log(id);
        // console.log(userId);

        let user = await User.findOne({_id : userId});

        if(!user)
            return res.status(404).json("user not found");
        
        // update user here

        console.log(user);

        let updateChanges = {
            ...user._doc,
            about ,
            coverPic,
            profilePic ,
            name ,
        };




         

        console.log(updateChanges);

        let res = await User.updateOne({_id : userId},updateChanges);

        return res.status("updated successfully");

    } catch (error) {
        res.status(500).json(error);
    }
}

module.exports = {
    getUser : getUser,
    updateUser : updateUser
};