const express = require('express')
const router = express.Router();
const {handleSignup,handleSignin,handleGetUserProfile} = require('../controller/auth')
//router.post('/signup',()=>{console.log('hii')})
router.post('/signup',handleSignup)
router.post('/signin',handleSignin)
router.get('/profile',handleGetUserProfile)
module.exports =router