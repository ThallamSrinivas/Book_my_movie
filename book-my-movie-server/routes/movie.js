const express = require('express')
const router = express.Router();
const controller = require('../controller/movie')

router.post('/',controller.handleCreateMovie) // add middleware that allows only admin
router.get('/',controller.handleGetAllMovies)
router.get('/:id',controller.handleGetMovieById)
router.delete('/:id',controller.handleDeleteMovieById)
module.exports = router