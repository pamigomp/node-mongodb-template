'use strict';
const {pushNotificationService} = require('../services/index');
const logger = require('../../libs/logger');

module.exports = {
    createSubscription(req, res, next) {
        return pushNotificationService.createSubscription(req.body).then((subscription) => {
            const msg = `Subscription with ID: ${subscription._id} was successfully created`;
            logger.info(msg);
            res.status(201).send({message: msg});
        }).catch(next);
    },

    sendNotifications(req, res, next) {
        const payload = {
            title: req.body.title,
            message: req.body.message,
            url: req.body.url,
            ttl: req.body.ttl,
            icon: req.body.icon,
            image: req.body.image,
            badge: req.body.badge,
            tag: req.body.tag
        };
        return pushNotificationService.sendNotifications(payload).then((results) => {
            logger.debug(results);
            const msg = 'Push notification was successfully sent to all subscribers';
            logger.info(msg);
            res.status(200).send({message: msg});
        }).catch(next);
    },

    deleteSubscription(req, res, next) {
        return pushNotificationService.deleteSubscription(req.body.endpoint).then((subscription) => {
            if (!subscription) {
                const msg = `Cannot find subscription with endpoint ${req.body.endpoint}`;
                logger.warn(msg);
                res.status(400).send({message: msg});
            } else {
                const msg = `Subscription with endpoint: ${subscription.endpoint} was successfully deleted`;
                logger.info(msg);
                res.status(200).send({message: msg});
            }
        }).catch(next);
    }
};
