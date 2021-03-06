'use strict';
const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');

const Schema = mongoose.Schema;

const ProductSchema = new Schema({
    title: {type: String, required: true, unique: true, maxlength: 48},
    saleTaxRate: {type: Number, required: true, min: 0, max: 100},
    salePriceGross: {type: Number, required: true, min: 0},
    description: {type: String, required: true},
    stockAmount: {type: Number, required: false, default: 0, min: 0},
    categoryId: {type: mongoose.Types.ObjectId, required: true, ref: 'Category'},
    producerId: {type: mongoose.Types.ObjectId, required: true, ref: 'Producer'}
}, {timestamps: true});

ProductSchema.plugin(mongoosePaginate);

module.exports = ProductSchema;
