const express = require('express')
const { registerUser,loginUser,getMe} = require('../controllers/userControllers')
const {protect} = require("../middleware/authMiddleware")
const router = express.Router()

router.post('/register' , registerUser)

router.post('/login' , loginUser)

router.post('/me' , protect , getMe)

module.exports = router