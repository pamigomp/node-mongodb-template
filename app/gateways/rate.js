'use strict';
const rateModel = require('../models/rate');

const getRates = (query) => {
    return rateModel.find(query).lean();
};

const deleteRate = (query) => {
    return rateModel.findOneAndRemove(query);
};

module.exports = {
    getAllRates() {
        const query = {};
        return getRates(query);
    },

    createRate(newRate) {
        return rateModel.create(newRate);
    },

    getRateById(id) {
        return rateModel.findById(id);
    },

    updateRateById(id, newRate) {
        return rateModel.findByIdAndUpdate(id, newRate, {new: true});
    },

    deleteRateById(id) {
        return rateModel.findByIdAndRemove(id);
    },

    getRatesByCustomerId(id) {
        const query = {customerId: id};
        return getRates(query);
    },

    getRatesByProductId(id) {
        const query = {productId: id};
        return getRates(query);
    },

    deleteRateByCustomerId(id) {
        const query = {customerId: id};
        return deleteRate(query);
    },

    deleteRateByProductId(id) {
        const query = {productId: id};
        return deleteRate(query);
    }
};
