'use strict';
const mongoose = require('mongoose');
const timestampPlugin = require('../plugins/timestamp');

const Schema = mongoose.Schema;

const OrderSchema = new Schema({
    paymentStatus: {type: Boolean, required: false, default: false},
    discountCode: {type: String, required: false, maxlength: 16},
    totalPrice: {type: Number, required: true, min: 0},
    shippingDate: {type: Date, required: false, maxlength: 256},
    additionalInformation: {type: String, required: false, maxlength: 256},
    cartId: {type: mongoose.Types.ObjectId, required: true},
    employeeId: {type: mongoose.Types.ObjectId, required: true},
    customerId: {type: mongoose.Types.ObjectId, required: true},
    shippingId: {type: mongoose.Types.ObjectId, required: true},
    status: {
        type: String,
        required: true,
        enum: ['PENDING_PAYMENT', 'PENDING', 'PROCESSING', 'PENDING_SHIPMENT', 'SEND', 'SHIPPED', 'COMPLETED', 'CANCELLED']
    },
    paymentMethod: {
        type: String,
        required: true,
        enum: ['CASH', 'CREDIT_CARD', 'DEBIT_CARD', 'BANK_TRANSFER', 'BLIK', 'PAYPAL']
    }
});

OrderSchema.plugin(timestampPlugin);

module.exports = OrderSchema;
