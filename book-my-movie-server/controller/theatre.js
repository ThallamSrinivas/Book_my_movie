const Theatre = require('../models/theatre')
const handleCreateTheatre= async(req,res)=>{
    const {name,location:{lat,lon,address},isActive} = req.body;
    const cur_theatre = await Theatre.create({name,location:{lat,lon,address},isActive})
    res.json({message:'theatre added successfully',_id:cur_theatre.id})
}
const handleGetAllTheatres = async (req,res)=>{
    let page = req.query.page ? parseInt(req.query.page) : 1;
    const LIMIT =5
    const SKIP = (page-1)*LIMIT;
    const theatre = await Theatre.find({}).skip(SKIP).limit(LIMIT)
    res.json({status:'success',data:{theatre}})
}

const handleGetTheatreById =async(req,res)=>{
    const id= req.params.id
    try{
        const cur_theatre = await Theatre.findById(id)
        if(cur_theatre)
            return res.json({status:'success',data:{cur_theatre}})
        return res.json({message:`Id not found in database`})
    }
    catch(err){
        res.json({message:`Id not found in database`})
    }
    
}
const handleDeleteTheatreById =async(req,res)=>{
    const id= req.params.id
    try{
        const cur_theatre = await Theatre.findByIdAndDelete(id)
        return res.json({status:'success',message:`$theatre with the id ${id} deleted`})
    }
    catch(err){
        res.json({message:`Id not found in database`})
    }
    
}
module.exports={handleCreateTheatre,handleGetAllTheatres,handleGetTheatreById,handleDeleteTheatreById}