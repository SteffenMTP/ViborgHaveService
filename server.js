const express = require('express')
require('dotenv').config()
const cors = require('cors')
const app = express()

//Mongo
const mongoose = require('mongoose')
mongoose.connect(process.env.DB_URL, {useNewUrlParser: true, useUnifiedTopology: true, autoIndex: true})
const db = mongoose.connection
db.on('error', (err) => console.log("Error" + err))
db. once('open', () => console.log("Database up and running!"))


// APP
app.use(express.json())                         // JSON
app.use(express.urlencoded({extended: true}))   // URL Encoded
app.use(cors({origin: true}))                   // cors - cross origin ressource sharing
app.use(express.static('public'))               // hvorfra statiske filer må hentes


// ROUTES
app.get('/', async(req, res) => {

    console.log("Serveren svarer")
    return res.status(200).json({message: "Welcome to the server" } )


})

//Endpoints
app.use('/service', require('./routes/haveservice.routes'))


// No match
app.get('*', async (req, res) => {
    res.status(404).json({message: "The site could not be found - try http://localhost:" + process.env.PORT } )
} )


// LISTEN
app.listen(process.env.PORT, ()=> console.log("Server startet - listening to port: " + process.env.PORT ) )

