const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const mongoose = require('mongoose');

const app = express();

const notesRoutes = require('./api/routes/notes')

mongoose.connect(
    'mongodb+srv://fernando:' + process.env.MONGO_ATLAS_PW + '@cluster-mcga.dc5pi.mongodb.net/<dbname>?retryWrites=true&w=majority',
    {
        useUnifiedTopology: true,
        useNewUrlParser: true
    }
)

app.use(morgan('dev'))

app.use(bodyParser.urlencoded({
    extended: false
}))
app.use(bodyParser.json())

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Acces-Control-Allow-Headers, Origin, X-Requested-With, Content-Type, Accept, Autorization')
    if (req.method === 'OPTIONS') {
        res.header('Acces-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET')
        return res.status(200).json({})
    }
    next();
})

app.use('/notes', notesRoutes)

app.use((req, res, next) => {
    const error = new Error('Not found')
    error.status = 404
    next(error)
})

app.use((error, req, res, next) => {
    res.status(error.status || 500)
    res.json({
        error: {
            message: error.message
        }
    })
})

module.exports = app