const { response } = require('express');
var express = require('express')
var router = express.Router()
const bodyParser = require('body-parser')
const panoController = require('../controllers/panoController')

router.use(bodyParser.json())

router.get('/', function(req, res) {
    res.send("Router Pano")
})

router.get('/getAllPanos', panoController.getAllPanos)

router.get('/getSinglePano/:filterName/:filterValue', panoController.getSinglePanoByFilterAndValue)

router.get('/getFirmaNames', panoController.getFirmaNames)

router.get('/getSinglePanoById/:id', panoController.getSinglePanoById)

router.post('/setSinglePano', panoController.setSinglePano)

router.post('/updatePano', panoController.updatePano)

router.get('/deleteSinglePano/:id', panoController.deleteSinglePano)
router.get('/getMicroNo', panoController.getMicroNo)

module.exports = router;