'use strict';
const positionModel = require('../models/position');

module.exports = {
    getAllPositions() {
        return positionModel.find().lean();
    },

    createPosition(newPosition) {
        return positionModel.create(newPosition);
    },

    getPositionById(id) {
        return positionModel.findById(id);
    },

    updatePositionById(id, newPosition) {
        return positionModel.findByIdAndUpdate(id, newPosition, {new: true});
    },

    deletePositionById(id) {
        return positionModel.findByIdAndRemove(id);
    }
};
