const mongoose = require('mongoose')
// we have to design a schema for movie table

const movieSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true
    },
    language:{
        type:String,
        required:true
    }
},{timestamps:true})

const Movie = mongoose.model('movie',movieSchema)
module.exports= Movie