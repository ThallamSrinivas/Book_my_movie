const express = require('express')
const router = express.Router();
const controller = require('../controller/theatre')

router.post('/',controller.handleCreateTheatre) // add middleware that allows only admin
router.get('/',controller.handleGetAllTheatres)
router.get('/:id',controller.handleGetTheatreById)
router.delete('/:id',controller.handleDeleteTheatreById)
module.exports = router