const express = require('express')
const router = express.Router();
const controller = require('../controller/movieSchedule')

router.post('/',controller.handleCreateMovieSchedule) // add middleware that allows only admin
router.get('/',controller.handleGetAllMovieShedules)
router.get('/:id',controller.handleGetMovieScheduleById)
router.delete('/:id',controller.handleDeleteMovieScheduleById)
module.exports = router