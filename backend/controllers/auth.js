const User = require("../model/User.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Relationship = require("../model/follower.js");

const login = async (req,res) => {
    try {
        
        let {email,password} = req.body;
        
        let isUserExist = await User.findOne({email});

        if(!isUserExist){
            return res.status(400).json("User not found");
        }

        let matchPassword = await bcrypt.compare(password,isUserExist.password);

        if(!matchPassword){
            return res.status(400).json("give correct credential");
        }

        const token = jwt.sign({ id: isUserExist._id,username: isUserExist.name }, process.env.SECRET_KEY);

        const { password: pas , ...others } = isUserExist._doc;

        console.log("login successfully");

        res.cookie('accessToken',token,{
            httpOnly : true,
            secure : true,
            sameSite : "None"
        }).status(200).json(others);

    } catch (error) {
        console.log(error);
        res.status(500).json(error);   
    }
}

const logout = (req,res) => {
    res.clearCookie('accessToken',{
        secure : true,
        sameSite : "none"
    });
    res.json("you are log out");
}

const register = async (req,res) => {
    try {
        const { name , email , password,username } = req.body;
        console.log(name + " " + email + " " + password);
        console.log(req.body);
        // check User id exist
        let isUserExist = await User.findOne({ email : email });

        console.log(isUserExist);

        if(isUserExist){
            throw new Error("there is already account having this email address in db");
        }
        //create a new user
        let salt = await bcrypt.genSalt();
        let hashPassword = await bcrypt.hash(password,salt);
        let user = await User.create({email,name,password : hashPassword,username});

        await Relationship.create({ userId : user._id });

        console.log(user);

        let token = jwt.sign({id : user._id,username : user.name},process.env.SECRET_KEY);

        let {password:pas , ...other } = user._doc;

        res.cookie('accessToken',token,{
            httpOnly : true,
            secure : true,
            sameSite : "None"
        }).status(201).json(other);
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
}

module.exports = {
    login,
    register,
    logout
};