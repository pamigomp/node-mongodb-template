'use strict';
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ProducerSchema = new Schema({
    name: {type: String, required: true, unique: true, maxlength: 32}
}, {timestamps: true});

module.exports = ProducerSchema;
