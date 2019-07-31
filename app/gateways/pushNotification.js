'use strict';
const webpush = require('web-push');
const q = require('q');
const subscriptionModel = require('../models/subscription');

module.exports = {
    createSubscription(newSubscription) {
        return subscriptionModel.create(newSubscription);
    },

    sendNotifications(notification) {
        return subscriptionModel.find().lean().then((subscriptions) => {
            const parallelSubscriptionCalls = subscriptions.map((subscription) => {
                return new Promise((resolve, reject) => {
                    const pushSubscription = {
                        endpoint: subscription.endpoint,
                        keys: {
                            p256dh: subscription.keys.p256dh,
                            auth: subscription.keys.auth
                        }
                    };

                    const pushPayload = JSON.stringify(notification);
                    const pushOptions = {
                        vapidDetails: {
                            subject: `mailto:${process.env.MAIL_TO}`,
                            privateKey: process.env.PRIVATE_VAPID_KEY,
                            publicKey: process.env.PUBLIC_VAPID_KEY
                        },
                        TTL: notification.ttl,
                        headers: {}
                    };
                    return webpush.sendNotification(pushSubscription, pushPayload, pushOptions).then((value) => {
                        resolve({
                            status: true,
                            endpoint: subscription.endpoint,
                            data: value
                        });
                    }).catch((err) => {
                        reject({
                            status: false,
                            endpoint: subscription.endpoint,
                            data: err
                        });
                    });
                });
            });
            return q.allSettled(parallelSubscriptionCalls);
        });
    }
};
