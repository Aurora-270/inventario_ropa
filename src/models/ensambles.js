const mongoose3 = require('mongoose');
const bcrypt = require('bcrypt-nodejs');

const { Schema } = mongoose3;

const ensamble_Schema = new Schema({
  Marca: String,
  Modelo: String,
  Talla: String,
  Color: String,
  Precio: Number,
  Cantidad: Number
});

module.exports = mongoose3.model('ensamble', ensamble_Schema);