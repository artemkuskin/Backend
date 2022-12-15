const {Schema, model} = require('mongoose')

const Menu = new Schema({
  name: String,
  price: Number,
  description: String,
  image: String,
  category: String

})

module.exports = model('product', Menu)