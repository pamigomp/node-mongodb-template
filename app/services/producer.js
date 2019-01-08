'use strict';
const {producerGateway} = require('../gateways/index');
const helpers = require('../helpers/helpers');

module.exports = {
    getAllProducers() {
        return producerGateway.getAllProducers().then((res) => {
            return helpers.caseInsensitiveSorting(res, 'name');
        });
    },

    createProducer(newProducer) {
        return producerGateway.createProducer(newProducer);
    },

    getProducerById(id) {
        return producerGateway.getProducerById(id);
    },

    updateProducerById(id, newProducer) {
        return producerGateway.updateProducerById(id, newProducer);
    },

    deleteProducerById(id) {
        return producerGateway.deleteProducerById(id);
    }
};
