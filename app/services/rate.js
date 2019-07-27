'use strict';
const {rateGateway, productGateway} = require('../gateways/index');

module.exports = {
    getAllRates() {
        return rateGateway.getAllRates();
    },

    createRate(newRate) {
        return rateGateway.createRate(newRate);
    },

    getRateById(id) {
        return rateGateway.getRateById(id);
    },

    updateRateById(id, updatedRate) {
        return rateGateway.updateRateById(id, updatedRate);
    },

    deleteRateById(id) {
        return rateGateway.deleteRateById(id);
    },

    getAllRatesForProductWithId(id) {
        return rateGateway.getRatesByProductId(id);
    },

    createRateForProductWithId(id, newRate) {
        const res = {};
        return productGateway.getProductById(id).then((product) => {
            res.product = product;
            if (product) {
                newRate.productId = id;
                return rateGateway.createRate(newRate);
            } else {
                return Promise.resolve();
            }
        }).then((rate) => {
            res.rate = rate;
            return res;
        });
    }
};
