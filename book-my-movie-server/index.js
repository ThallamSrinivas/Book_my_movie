const express = require('express');
const mongoose = require('mongoose');
const authRouter = require('./routes/auth')
const movieRouter = require('./routes/movie')
const theatreRouter = require('./routes/theatre')
const scheduleRouter = require('./routes/movieSchedule')
const cors = require('cors')
const app=express();
const port=8000;
require('dotenv').config()
//mongo_url='mongodb://username:password@host:port/database?options...';
mongoose.connect(process.env.mongo_url).then(()=>{console.log(`Conneted to mongoDB`)})
app.use(express.json()) //middleware
app.use(cors())
app.get('/',(req,res)=>{res.send(`Home Page`)})
app.use(`/v1/auth`, authRouter) //registration
app.use(`/v1/movies`,movieRouter)
app.use(`/v1/theatres`,theatreRouter)
app.use(`/v1/schedules`,scheduleRouter)
app.listen(port,(err)=>{
    if(!err) 
    console.log(`server started at port:${port}`)
    else
    console.log(`error connecting to the port ${port}`)
})