const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken')
const User  = require('../models/User')

const registerUser = async(req, res) => {
    const { userName, email, password } = req.body;
    try{
        const checkEmail =  await User.findOne({email});
        if(checkEmail) return res.json({success:false,message:'Email already exists'})
        const hashPassword = await bcrypt.hash(password,12);
        const newUser = new User({
            userName,email, password:hashPassword
        })
        await newUser.save();
        res.status(200).json({
            success:true,
            message: 'User Registration Successfull' 
        })
    }catch(e){
        console.log(e)
        res.status(500).json({
            success:false,
            message: 'Error Occured'
        })
    }
}

const loginUser = async(req, res) => {
    const {email,password} = req.body;
    try{

    }catch(e){
        res.status(500).json({
            success:false,
            message:'Error Occured'
        })
    }
}

module.exports = {registerUser}