'use strict';
const webpush = require('web-push');
const q = require('q');
const subscriptionModel = require('../models/subscription');

webpush.setVapidDetails(`mailto:${process.env.MAIL_TO}`, process.env.PUBLIC_VAPID_KEY, process.env.PRIVATE_VAPID_KEY);

module.exports = {
    createSubscription(newSubscription) {
        return subscriptionModel.create(newSubscription);
    },

    getSubscriptionByEndpoint(endpoint) {
        return subscriptionModel.findOne({endpoint: endpoint});
    },

    sendNotifications(notification, ttl) {
        return subscriptionModel.find().lean().then((subscriptions) => {
            const parallelSubscriptionCalls = subscriptions.map((subscription) => {
                return new Promise((resolve, reject) => {
                    const pushPayload = JSON.stringify(notification);
                    const pushOptions = {
                        TTL: ttl
                    };
                    return webpush.sendNotification(subscription, pushPayload, pushOptions).then((value) => {
                        resolve({
                            status: true,
                            endpoint: subscription.endpoint,
                            data: JSON.stringify(value)
                        });
                    }).catch((err) => {
                        reject({
                            status: false,
                            endpoint: subscription.endpoint,
                            data: err.toString()
                        });
                    });
                });
            });
            return q.allSettled(parallelSubscriptionCalls);
        });
    },

    deleteSubscriptionByEndpoint(endpoint) {
        return subscriptionModel.findOneAndRemove({endpoint: endpoint});
    }
};
