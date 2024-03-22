const Movie = require('../models/movie')
const handleCreateMovie= async(req,res)=>{
    console.log(req.body)
    const {title,description,language} = req.body;
    const cur_movie = await Movie.create({title,description,language})
    res.json({message:'movie added successfully',_id:cur_movie.id})
}
const handleGetAllMovies = async (req,res)=>{
    let page = req.query.page ? parseInt(req.query.page) : 1;
    const LIMIT =5
    const SKIP = (page-1)*LIMIT;
    const movie = await Movie.find({}).skip(SKIP).limit(LIMIT)
    res.json({status:'success',data:{movie}})
}

const handleGetMovieById =async(req,res)=>{
    const id= req.params.id
    try{
        const cur_movie = await Movie.findById(id)
        return res.json({status:'success',data:{cur_movie}})
    }
    catch(err){
        res.json({message:`Id not found in database`})
    }
    
}
const handleDeleteMovieById =async(req,res)=>{
    const id= req.params.id
    try{
        const cur_movie = await Movie.findByIdAndDelete(id)
        return res.json({status:'success',message:`$movie with the id ${id} deleted`})
    }
    catch(err){
        res.json({message:`Id not found in database`})
    }
    
}
module.exports={handleCreateMovie,handleGetAllMovies,handleGetMovieById,handleDeleteMovieById}