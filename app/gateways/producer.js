'use strict';
const producerModel = require('../models/producer');

module.exports = {
    getAllProducers() {
        return producerModel.find().select(['-createdAt', '-updatedAt', '-__v']).lean();
    },

    createProducer(newProducer) {
        return producerModel.create(newProducer);
    },

    getProducerById(id) {
        return producerModel.findById(id).select(['-createdAt', '-updatedAt', '-__v']);
    },

    updateProducerById(id, updatedProducer) {
        return producerModel.findByIdAndUpdate(id, updatedProducer, {new: true});
    },

    deleteProducerById(id) {
        return producerModel.findByIdAndRemove(id);
    }
};
