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

    updatePositionById(id, newPosition) {
        return positionGateway.updatePositionById(id, newPosition);
    },

    deletePositionById(id) {
        return positionGateway.deletePositionById(id);
    }
};
