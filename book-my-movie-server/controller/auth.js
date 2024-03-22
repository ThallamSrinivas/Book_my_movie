const { v4: uuidv4 } = require('uuid');
const crypto = require('crypto');
const User = require('../models/user')
const {generateUserToken,verifyUserToken} = require('../lib/jwtokens')

async function handleSignup(req,res){
    const {firstName,lastName,email,password,role} = req.body;
    const salt = uuidv4();
    const hashedPassword = crypto.createHmac('sha256',salt).update(password).digest('hex');
    try{
        const cur_user= await User.create({firstName,lastName,email,password:hashedPassword,salt,role})
        res.json({'success':'ok',id :cur_user._id})
    }
    catch(err){
        if(err.code==11000)
            return res.status(400).json({message:`${email} already exists`})
        return res.status(500).json({message:`Internal server error`})
    }    
        
}
async function handleSignin(req,res){
    const {email,password} = req.body;
    // find if user exist in database
    const cur_user=await User.findOne({email})
    if(!cur_user){
        return res.status(400).json({error:`user with email ${email} does not exist`})
    }
    const salt = cur_user.salt;
    const hashedPassword = crypto.createHmac('sha256',salt).update(password).digest('hex');
    
    if(hashedPassword==cur_user.password){
        // generate a token based on id and user role.(and secret key only admin knows)
        const token = generateUserToken(cur_user.id,cur_user.role)
        const payload = verifyUserToken(token)
        // // console.log(payload)// payload: user data that is used, to generate token
        return res.json({message:`User Authenticated`,data:{'token':token}})
    }        
    return res.json({error:`email or password is wrong`})   
}
async function handleGetUserProfile(req,res){
    const user = req.user;
    if (!user) return res.json({ profile: null })

    const userInDb = await User.findById(user._id)

    return res.json({
        profile: {
            firstName: userInDb.firstName,
            lastName: userInDb.lastName,
            email: userInDb.email,
            role: userInDb.role,
        }
    })
}
module.exports = {
    handleSignup, 
    handleSignin, 
    handleGetUserProfile
}