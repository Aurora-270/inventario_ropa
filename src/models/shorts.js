const mongoose4= require('mongoose');
const bcrypt = require('bcrypt-nodejs');

const { Schema } = mongoose4;

const short_Schema = new Schema({
  Marca: String,
  Modelo: String,
  Talla: String,
  Color: String,
  Precio: Number,
  Cantidad: Number
});

module.exports = mongoose4.model('short', short_Schema);