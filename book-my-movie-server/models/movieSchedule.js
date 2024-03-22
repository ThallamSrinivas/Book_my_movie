const mongoose = require('mongoose')
// we have to design a schema for movieshows table

const movieScheduleSchema = new mongoose.Schema({
    movieId:{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'movie'
    },
    theatreId:{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'theatre'
    },
    showTime:{
        type:Date,
        required:true
    },
    price:{
        type:Number,
        required:true
    }
},{timestamps:true})
movieScheduleSchema.index({ movieId: 1, theatreId: 1, startTime: 1 }, { unique: true })
const movieSchedule = mongoose.model('shows',movieScheduleSchema)
module.exports=movieSchedule