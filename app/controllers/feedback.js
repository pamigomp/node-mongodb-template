'use strict';
const {feedbackService} = require('../services/index');
const logger = require('../../libs/logger');

module.exports = {
    getFeedback(req, res, next) {
        return feedbackService.getFeedbackById(req.params.feedbackId).then((feedback) => {
            if (!feedback) {
                const msg = `Cannot find feedback with ID ${req.params.feedbackId}`;
                logger.warn(msg);
                res.status(400).send({message: msg});
            } else {
                res.status(200).send(feedback);
            }
        }).catch(next);
    },

    updateFeedback(req, res, next) {
        return feedbackService.updateFeedbackById(req.params.feedbackId, req.body).then((feedback) => {
            if (!feedback) {
                const msg = `Cannot find feedback with ID ${req.params.feedbackId}`;
                logger.warn(msg);
                res.status(400).send({message: msg});
            } else {
                const msg = `Feedback with ID: ${feedback._id} was successfully updated`;
                logger.info(msg);
                res.status(200).send({message: msg});
            }
        }).catch(next);
    },

    deleteFeedback(req, res, next) {
        return feedbackService.deleteFeedbackById(req.params.feedbackId).then((feedback) => {
            if (!feedback) {
                const msg = `Cannot find feedback with ID ${req.params.feedbackId}`;
                logger.warn(msg);
                res.status(400).send({message: msg});
            } else {
                const msg = `Feedback with ID: ${feedback._id} was successfully deleted`;
                logger.info(msg);
                res.status(200).send({message: msg});
            }
        }).catch(next);
    },

    getAllFeedbacksForProductWithId(req, res, next) {
        return feedbackService.getAllFeedbacksForProductWithId(req.params.productId).then((feedbacks) => {
            res.status(200).send(feedbacks);
        }).catch(next);
    },

    createFeedbackForProductWithId(req, res, next) {
        return feedbackService.createFeedbackForProductWithId(req.params.productId, req.body).then((data) => {
            if (!data.product) {
                const msg = `Cannot find product with ID ${req.params.productId}`;
                logger.warn(msg);
                res.status(400).send({message: msg});
            } else {
                const msg = `Feedback with ID: ${data.feedback._id} was successfully created`;
                logger.info(msg);
                res.status(201).send({message: msg});
            }
        }).catch(next);
    }
};
