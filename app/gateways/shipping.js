'use strict';
const shippingModel = require('../models/shipping');

module.exports = {
    getAllShippings() {
        return shippingModel.find().lean();
    },

    createShipping(newShipping) {
        return shippingModel.create(newShipping);
    },

    getShippingById(id) {
        return shippingModel.findById(id);
    },

    updateShippingById(id, newShipping) {
        return shippingModel.findByIdAndUpdate(id, newShipping, {new: true});
    },

    deleteShippingById(id) {
        return shippingModel.findByIdAndRemove(id);
    }
};
