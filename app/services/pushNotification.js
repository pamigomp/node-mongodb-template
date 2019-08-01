'use strict';
const {pushNotificationGateway} = require('../gateways/index');

module.exports = {
    createSubscription(newSubscription) {
        return pushNotificationGateway.getSubscriptionByEndpoint(newSubscription.endpoint).then((subscription) => {
            if (!subscription) {
                return pushNotificationGateway.createSubscription(newSubscription);
            } else {
                return Promise.resolve({exists: true, _id: subscription._id});
            }
        });
    },

    sendNotifications(notification, ttl) {
        return pushNotificationGateway.sendNotifications(notification, ttl);
    },

    deleteSubscription(endpoint) {
        return pushNotificationGateway.deleteSubscriptionByEndpoint(endpoint);
    }
};
