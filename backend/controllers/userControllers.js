const asyncHandler = require("express-async-handler")
const bcrypt = require('bcryptjs')
const User = require('../models/userModel')
const jwt = require('jsonwebtoken')

// Generate Token

const generateToken = (id) => {
    return jwt.sign({id} , process.env.JWT_SECRET , { expiresIn : '30d'})
}


// desc : Register new user
// route : /api/user/register
// access : public

const registerUser = asyncHandler(async(req,res) => {

    const {name , email , password} = req.body

    // Validation
    if(!name || !email || !password){
        
        // return res.status(400).json({msg : "Please Include All Fields"})
        res.status(400)      
        throw new Error("Please Include All Fields")

    }

    // Find if ser already exits

    const userExists = await User.findOne({email : email})

    if(userExists){
        res.status(400)
        throw new Error("User Already Exists")
    }

    // Hash Password

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password , salt)

    // Create user

    const user = await User.create({
        name,
        email,
        password : hashedPassword
    })

    if(user){
        res.status(201).json({
            _id : user._id,
            name : user.name,
            email : user.email,
            token : generateToken(user._id)
        })
    }else{
        res.status(400)
        throw new Error("Invalid User Data")
    }


    res.send('Register')
})

const loginUser = asyncHandler(async(req,res) => {
    const {email , password} = req.body
 
    // Find User
    const user = await User.findOne({email : email})
    const validPassword = await bcrypt.compare(password , user.password)
    // Check if credentials are correct
    if(user && validPassword){
        res.status(200).json({
            _id : user._id,
            name : user.name,
            email : user.email,
            token : generateToken(user._id)
        })
    }else{
        res.status(400)
        throw new Error("Invalid Credentials")
    }   
 
 })

 const getMe = (req,res)=>{
    res.send(" i am get route")
 }


module.exports = {registerUser,loginUser,getMe}