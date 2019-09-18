'use strict';
const positionModel = require('../models/position');

module.exports = {
    getAllPositions() {
        return positionModel.find().sort('name').select(['-createdAt', '-updatedAt', '-__v']).lean();
    },

    createPosition(newPosition) {
        return positionModel.create(newPosition);
    },

    getPositionById(id) {
        return positionModel.findById(id).select(['-createdAt', '-updatedAt', '-__v']);
    },

    updatePositionById(id, updatedPosition) {
        return positionModel.findByIdAndUpdate(id, updatedPosition, {new: true});
    },

    deletePositionById(id) {
        return positionModel.findByIdAndRemove(id);
    }
};
