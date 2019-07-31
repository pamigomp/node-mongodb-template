'use strict';
const {pushNotificationGateway} = require('../gateways/index');

module.exports = {
    createSubscription(newSubscription) {
        return pushNotificationGateway.createSubscription(newSubscription);
    },

    sendNotifications(notification, ttl) {
        return pushNotificationGateway.sendNotifications(notification, ttl);
    },

    deleteSubscription(endpoint) {
        return pushNotificationGateway.deleteSubscriptionByEndpoint(endpoint);
    }
};
