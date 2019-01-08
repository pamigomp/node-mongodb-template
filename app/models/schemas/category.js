'use strict';
const mongoose = require('mongoose');
const timestampPlugin = require('../plugins/timestamp');

const Schema = mongoose.Schema;

const CategorySchema = new Schema({
    name: {type: String, required: true, unique: true, maxlength: 32}
});

CategorySchema.plugin(timestampPlugin);

module.exports = CategorySchema;
