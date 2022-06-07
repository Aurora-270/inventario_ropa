const mongoose2 = require('mongoose');
const bcrypt = require('bcrypt-nodejs');

const { Schema } = mongoose2;

const vestido_Schema = new Schema({
  Marca: String,
  Modelo: String,
  Talla: String,
  Color: String,
  Precio: Number,
  Cantidad: Number
});

module.exports = mongoose2.model('vestido', vestido_Schema);