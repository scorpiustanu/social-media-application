const Relationship = require("../model/follower.js");
const jwt = require("jsonwebtoken");

const followUser = async (req,res) => {
    try {
        
        
        let token = req.cookies.accessToken;
        console.log(token);

        if(!token){
            return res.status(401).json({message : "not authorized"});
        }

        jwt.verify(token,process.env.SECRET_KEY,async (err,userinfo) => {
            console.log("bdsbxhj bn");
            if(err) return res.status(400).json({message : "token expired! please login first"});
    
            const followUserId = req.params.followId;
            console.log(followUser);

            let relationShip = await Relationship.findOne({userId : followUserId});

            console.log("relationShip : " + relationShip);
            relationShip.followers.push(userinfo.id);
            console.log("relationShip : " + relationShip);
            await relationShip.save();

            return res.status(200).json("your follow the user successfully");

        });

    } catch (error) {
        res.status(500).json(error);
    }
}


const unFollowUser = async (req,res) => {
    let token = req.cookies.accessToken;

    if(!token){
        return res.status(401).json({message : "not authorized"});
    }

    jwt.verify(token,process.env.SECRET_KEY,async(err,userinfo) => {
        if(err) return res.status(400).json({message : "token expired! please login first"});

        const unfollowUserId = req.params.followId;

        let relationShip = await Relationship.findOne({userId : unfollowUserId});

        relationShip.followers.pull(userinfo.id);
        await relationShip.save();

        return res.status(200).json("your unfollow the user successfully");

    });
}


module.exports = {
    followUser,
    unFollowUser
}