'use strict';
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ImageSchema = new Schema({
    url: {
        type: String,
        unique: true,
        default: 'https://bookyourstock.com/index.php/home/vendor_profile/get_slider/',
        maxlength: 128
    },
    productId: {type: mongoose.Types.ObjectId, required: true, unique: true}
}, {timestamps: true});

module.exports = ImageSchema;
