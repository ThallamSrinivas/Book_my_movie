const MovieSchedule = require('../models/movieSchedule')
const handleCreateMovieSchedule= async(req,res)=>{
    const {movieId,theatreId,showTime,price} = req.body;
    try{
        const cur_movieSchedule = await MovieSchedule.create({movieId,theatreId,showTime,price})
        res.json({message:'movieSchedule added successfully',_id:cur_movieSchedule.id})
    }
    catch(error)
    {
        if (error.code === 11000)
            return res.status(400).json({ message: `Schedule already exists!` })
        return res.status(500).json({ message: 'Internal Server Error' })
    }
    
}
const handleGetAllMovieShedules = async (req,res)=>{
    let page = req.query.page ? parseInt(req.query.page) : 1;
    const LIMIT =5
    const SKIP = (page-1)*LIMIT;
    const movieSchedule = await MovieSchedule.find({}).skip(SKIP).limit(LIMIT)
    res.json({status:'success',data:{movieSchedule}})
}

const handleGetMovieScheduleById =async(req,res)=>{
    const id= req.params.id
    try{
        const cur_movieSchedule = await MovieSchedule.findById(id)
        return res.json({status:'success',data:{cur_movieSchedule}})
    }
    catch(err){
        res.json({message:`Id not found in database`})
    }
    
}
const handleDeleteMovieScheduleById =async(req,res)=>{
    const id= req.params.id
    try{
        const cur_movieSchedule = await MovieSchedule.findByIdAndDelete(id)
        return res.json({status:'success',message:`$movieSchedule with the id ${id} is deleted`})
    }
    catch(err){
        res.json({message:`Id not found in database`})
    }
    
}
module.exports={handleCreateMovieSchedule,handleGetAllMovieShedules,handleGetMovieScheduleById,handleDeleteMovieScheduleById}