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
            notification: {
                title: req.body.title, //iOS and Android
                body: req.body.body, //iOS and Android
                sound: req.body.sound, //iOS and Android
                click_action: req.body.click_action, //iOS and Android
                icon: req.body.icon, //Android
                tag: req.body.tag, //Android
                color: req.body.color, //Android
                badge: req.body.badge, //iOS
                subtitle: req.body.subtitle //iOS
            },
            ttl: req.body.ttl
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
