'use strict';
const mongoose = require('mongoose');
const timestampPlugin = require('../plugins/timestamp');

const Schema = mongoose.Schema;

const ShippingSchema = new Schema({
    method: {
        type: String,
        required: true,
        enum: ['COLLECTION_IN_PERSON', 'CASH_ON_DELIVERY', 'COURIER_PREPAYMENT', 'POCZTA_POLSKA', 'PACZKOMATY_INPOST'],
    },
    price: {type: Number, required: true, min: 0}
});

ShippingSchema.plugin(timestampPlugin);

module.exports = ShippingSchema;
