const mongoose = require('mongoose')

const MovieShowSchema = new mongoose.Schema({
    type: String,
    name: String,
    description: String
})

const MovieShowModel = mongoose.model("moviesshows", MovieShowSchema)
module.exports = MovieShowModel