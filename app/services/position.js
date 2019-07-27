'use strict';
const {positionGateway} = require('../gateways/index');
const helpers = require('../helpers/helpers');

module.exports = {
    getAllPositions() {
        return positionGateway.getAllPositions().then((res) => {
            return helpers.caseInsensitiveSorting(res, 'name');
        });
    },

    createPosition(newPosition) {
        return positionGateway.createPosition(newPosition);
    },

    getPositionById(id) {
        return positionGateway.getPositionById(id);
    },

    updatePositionById(id, updatedPosition) {
        return positionGateway.updatePositionById(id, updatedPosition);
    },

    deletePositionById(id) {
        return positionGateway.deletePositionById(id);
    }
};
