'use strict';
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const CartSchema = new Schema({
    products: [{
        id: {type: Schema.Types.ObjectId, required: true, ref: 'Product'},
        price: {type: Number, required: true, min: 0},
        amount: {type: Number, required: true, min: 0}
    }],
    customerId: {type: mongoose.Types.ObjectId, required: true, unique: true, ref: 'Customer'}
}, {timestamps: true});

module.exports = CartSchema;
