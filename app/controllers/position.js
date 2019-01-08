'use strict';
const {positionService} = require('../services/index');
const logger = require('../../libs/logger');

module.exports = {
    getAllPositions(req, res, next) {
        return positionService.getAllPositions().then((positions) => {
            res.status(200).send(positions);
        }).catch(next);
    },

    createPosition(req, res, next) {
        return positionService.createPosition(req.body).then((position) => {
            const msg = `Position with ID: ${position._id} was successfully created`;
            logger.info(msg);
            res.status(201).send({message: msg});
        }).catch(next);
    },

    getPosition(req, res, next) {
        return positionService.getPositionById(req.params.positionId).then((position) => {
            if (!position) {
                const msg = `Cannot find position with ID ${req.params.positionId}`;
                logger.warn(msg);
                res.status(400).send({message: msg});
            } else {
                res.status(200).send(position);
            }
        }).catch(next);
    },

    updatePosition(req, res, next) {
        return positionService.updatePositionById(req.params.positionId, req.body).then((position) => {
            if (!position) {
                const msg = `Cannot find position with ID ${req.params.positionId}`;
                logger.warn(msg);
                res.status(400).send({message: msg});
            } else {
                const msg = `Position with ID: ${position._id} was successfully updated`;
                logger.info(msg);
                res.status(200).send({message: msg});
            }
        }).catch(next);
    },

    deletePosition(req, res, next) {
        return positionService.deletePositionById(req.params.positionId).then((position) => {
            if (!position) {
                const msg = `Cannot find position with ID ${req.params.positionId}`;
                logger.warn(msg);
                res.status(400).send({message: msg});
            } else {
                const msg = `Position with ID: ${position._id} was successfully deleted`;
                logger.info(msg);
                res.status(200).send({message: msg});
            }
        }).catch(next);
    }
};
