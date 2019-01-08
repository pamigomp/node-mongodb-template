'use strict';
const {shippingGateway} = require('../gateways/index');

module.exports = {
    getAllShippings() {
        return shippingGateway.getAllShippings();
    },

    createShipping(newShipping) {
        return shippingGateway.createShipping(newShipping);
    },

    getShippingById(id) {
        return shippingGateway.getShippingById(id);
    },

    updateShippingById(id, newShipping) {
        return shippingGateway.updateShippingById(id, newShipping);
    },

    deleteShippingById(id) {
        return shippingGateway.deleteShippingById(id);
    }
};
