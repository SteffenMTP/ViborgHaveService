const mongoose = require('mongoose')

const serviceSchema = new mongoose.Schema({

    title: {
        type: String,
        required: [true, 'The Title name needs to be filled']
    },
    description: {
        type: String,
        required: [true, 'The description needs to be filled']
    },
    image: {
        type: String,
        default: "photo-coming-soon.jpg"
    }
} )

module.exports = mongoose.model('Service', serviceSchema, 'service')