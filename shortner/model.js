const mongoose = require('mongoose')

const urlSchema = new mongoose.Schema({
    url: String,
    shrunkUrl: String
})

const Url = mongoose.model('url', urlSchema)

module.exports = Url