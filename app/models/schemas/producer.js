'use strict';
const mongoose = require('mongoose');
const timestampPlugin = require('../plugins/timestamp');

const Schema = mongoose.Schema;

const ProducerSchema = new Schema({
    name: {type: String, required: true, unique: true, maxlength: 32}
});

ProducerSchema.plugin(timestampPlugin);

module.exports = ProducerSchema;
