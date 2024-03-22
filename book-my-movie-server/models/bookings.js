const mongoose = require('mongoose')

const bookingsSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user',
    },
    showsId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'shows',
    },
    transactionId:{
        type:String,
        required:true
    }
},{timestamps:true})

const Bookings = mongoose.model('bookings',bookingsSchema)
module.exports=Bookings