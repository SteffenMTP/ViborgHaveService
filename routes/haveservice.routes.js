const Service = require('../models/haveservice.model') // mongoose-schema

const express = require('express')
const router = express.Router()

//Multer til håndtering af filer i dette tilfælde images
const multer = require('multer')
const upload = multer({
    storage: multer.diskStorage({
        destination: function( req, file, cb) {
            cb(null, 'public/images')
        },
        filename: function ( req, file, cb) {
            cb(null, file.originalname )
        }
    })
})


//GET ALL til endpoint service
router.get('/', async(req, res) => {

    console.log("route service GET ALL")

    try {
        let services = await Service.find()
        return res.status(200).json( { services } )
        
    } catch (error) {
        return res.status(400).json( { message: "An error occured: " + error.message } )    
    }


})

//GET BY ID til endpoint service
router.get('/:id', async(req, res) => {
    
    console.log("route service GET BY ID")
    
    try {
        
        let service = await Service.findById(req.params.id)

        if(service == null) return res.status(404).json({message: "Data could not be found on the selected ID"})

        return res.status(200).json( service )
        
    } catch (error) {
        return res.status(400).json( { message: "An error occured: " + error.message } )
    }

})

//POST til endpoint service
router.post('/', upload.single("image"), async(req, res) => {

    // Skal kunne modtage fil/image
    console.log("route service POST")

    try {
        let service = new Service(req.body)
        service.image = req.file.filename;


        await service.save()
        return res.status(201).json( { message: 'New is created', created: service } )
        
    } catch (error) {
        return res.status(400).json( { message: "An error occured: " + error.message } )
    }

})

//PUT til endpoint service
router.put('/:id', upload.single("image"), async(req, res) => {

    console.log("route service PUT")
    
    try {
        
        // Håndter at der muligvis IKKE skal rette i billedet (else-delen)
        if(req.file) {
            req.body.image = req.file.filename
        }  else {
            let p = await Service.findById(req.params.id)
            req.body.image = p.image //Bevar det nuværende imagenavn/image
        }

        let service = await Service.findByIdAndUpdate({_id: req.params.id}, req.body, {new: true})
        
        if(service == null) return res.status(404).json({message: "Data could not be found or edited"})
        
        return res.status(201).json({message: 'Edit complete', updated: service})

    } catch (error) {

        return res.status(400).json( { message: "An error occured: " + error.message } )
    
    }


})

//DELETE til endpoint service
router.delete('/:id', async(req, res) => {

    console.log("route service DELETE")

    try {
        
        let service = await Service.findByIdAndDelete(req.params.id)

        if(service == null) return res.status(404).json({message: "Data could not be found or deleted"})

        return res.status(200).json({message: "service is deleted"})
        
    } catch (error) {
        return res.status(400).json( { message: "An error occured: " + error.message } )
    }

})

module.exports = router;