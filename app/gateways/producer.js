'use strict';
const producerModel = require('../models/producer');

module.exports = {
    getAllProducers() {
        return producerModel.find().lean();
    },

    createProducer(newProducer) {
        return producerModel.create(newProducer);
    },

    getProducerById(id) {
        return producerModel.findById(id);
    },

    updateProducerById(id, newProducer) {
        return producerModel.findByIdAndUpdate(id, newProducer, {new: true});
    },

    deleteProducerById(id) {
        return producerModel.findByIdAndRemove(id);
    }
};
