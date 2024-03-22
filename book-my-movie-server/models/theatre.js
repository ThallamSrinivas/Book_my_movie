const mongoose = require('mongoose')
// we have to design a schema for movie table

const theatreSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    location:{
        lat:{
            type:String,
        required:true
        },
        lon:{
            type:String,
            required:true
        },
        address:{
            type:String,
            required:true
        }
    },
    isActive:{
        type:Boolean,
        defalut:true
    }
},{timestamps:true})

const Theatre = mongoose.model('theatre',theatreSchema)
module.exports=Theatre