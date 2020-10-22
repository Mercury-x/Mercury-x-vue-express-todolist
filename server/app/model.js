const mongoose = require('mongoose')

const ItemSchema = new mongoose.Schema({
    text: String
})

const Item = mongoose.model('Item', ItemSchema)

module.exports = Item