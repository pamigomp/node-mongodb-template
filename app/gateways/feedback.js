'use strict';
const feedbackModel = require('../models/feedback');

const getFeedbacks = (query) => {
    return feedbackModel.find(query).lean();
};

const deleteFeedback = (query) => {
    return feedbackModel.findOneAndRemove(query);
};

module.exports = {
    getAllFeedbacks() {
        const query = {};
        return getFeedbacks(query);
    },

    createFeedback(newFeedback) {
        return feedbackModel.create(newFeedback);
    },

    getFeedbackById(id) {
        return feedbackModel.findById(id).select(['-createdAt', '-updatedAt', '-__v']);
    },

    updateFeedbackById(id, updatedFeedback) {
        return feedbackModel.findByIdAndUpdate(id, updatedFeedback, {new: true});
    },

    deleteFeedbackById(id) {
        return feedbackModel.findByIdAndRemove(id);
    },

    getFeedbacksByCustomerId(id) {
        const query = {customerId: id};
        return getFeedbacks(query);
    },

    getFeedbacksByProductId(id) {
        const query = {productId: id};
        return getFeedbacks(query);
    },

    deleteFeedbackByCustomerId(id) {
        const query = {customerId: id};
        return deleteFeedback(query);
    },

    deleteFeedbackByProductId(id) {
        const query = {productId: id};
        return deleteFeedback(query);
    }
};
