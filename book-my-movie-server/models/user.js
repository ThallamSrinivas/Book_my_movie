const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    firstName:{
        type: String,
        required: true
    },
    lastName:{
        type: String,
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    role:{
        type:String,
        enum:['user','admin'],
        default:'user'
    },
    password:{
        type: String,
        required: true
    },
    salt:{
        type: String,
        required: true
    }
},{timestamps:true})

const User = mongoose.model('user',userSchema)
module.exports=User