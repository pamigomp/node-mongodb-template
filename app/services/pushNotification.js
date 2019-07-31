'use strict';
const {pushNotificationGateway} = require('../gateways/index');

module.exports = {
    createSubscription(newSubscription) {
        return pushNotificationGateway.createSubscription(newSubscription);
    },

    sendNotifications(notification) {
        return pushNotificationGateway.sendNotifications(notification);
    }
};
