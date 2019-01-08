'use strict';
const mongoose = require('mongoose');
const timestampPlugin = require('../plugins/timestamp');

const Schema = mongoose.Schema;

const PositionSchema = new Schema({
    name: {type: String, required: true, unique: true, maxlength: 32}
});

PositionSchema.plugin(timestampPlugin);

module.exports = PositionSchema;
