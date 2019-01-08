'use strict';
const mongoose = require('mongoose');
const timestampPlugin = require('../plugins/timestamp');

const Schema = mongoose.Schema;

const CartSchema = new Schema({
    amount: {type: Number, required: true, min: 0},
    price: {type: Number, required: true, min: 0},
    productId: {type: mongoose.Types.ObjectId, required: true},
    customerId: {type: mongoose.Types.ObjectId, required: true}
});

CartSchema.plugin(timestampPlugin);

module.exports = CartSchema;
