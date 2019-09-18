'use strict';
const shippingModel = require('../models/shipping');

module.exports = {
    getAllShippings() {
        return shippingModel.find().sort('method').select(['-createdAt', '-updatedAt', '-__v']).lean();
    },

    createShipping(newShipping) {
        return shippingModel.create(newShipping);
    },

    getShippingById(id) {
        return shippingModel.findById(id).select(['-createdAt', '-updatedAt', '-__v']);
    },

    updateShippingById(id, updatedShipping) {
        return shippingModel.findByIdAndUpdate(id, updatedShipping, {new: true});
    },

    deleteShippingById(id) {
        return shippingModel.findByIdAndRemove(id);
    }
};
