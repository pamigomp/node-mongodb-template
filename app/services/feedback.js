'use strict';
const {feedbackGateway, productGateway} = require('../gateways/index');

module.exports = {
    getAllFeedbacks() {
        return feedbackGateway.getAllFeedbacks();
    },

    createFeedback(newFeedback) {
        return feedbackGateway.createFeedback(newFeedback);
    },

    getFeedbackById(id) {
        return feedbackGateway.getFeedbackById(id);
    },

    updateFeedbackById(id, newFeedback) {
        return feedbackGateway.updateFeedbackById(id, newFeedback);
    },

    deleteFeedbackById(id) {
        return feedbackGateway.deleteFeedbackById(id);
    },

    getAllFeedbacksForProductWithId(id) {
        return feedbackGateway.getFeedbacksByProductId(id);
    },

    createFeedbackForProductWithId(id, newFeedback) {
        const res = {};
        return productGateway.getProductById(id).then((product) => {
            res.product = product;
            if (product) {
                return feedbackGateway.createFeedback(newFeedback);
            } else {
                return Promise.resolve();
            }
        }).then((feedback) => {
            res.feedback = feedback;
            return res;
        });
    }
};
