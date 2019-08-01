'use strict';
const {pushNotificationService} = require('../services/index');
const logger = require('../../libs/logger');

module.exports = {
    createSubscription(req, res, next) {
        return pushNotificationService.createSubscription(req.body).then((subscription) => {
            if (subscription.exists) {
                const msg = `Subscription with ID: ${subscription._id} already exists`;
                logger.info(msg);
                res.status(200).send({message: msg});
            } else {
                const msg = `Subscription with ID: ${subscription._id} was successfully created`;
                logger.info(msg);
                res.status(201).send({message: msg});
            }
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
                subtitle: req.body.subtitle, //iOS
                vibrate: JSON.parse(req.body.vibrate) || [100, 50, 100],
                actions: [],
                image: req.body.image,
                lang: req.body.lang,
                renotify: req.body.renotify,
                requireInteraction: req.body.requireInteraction,
                silent: req.body.silent,
                data: {
                    url: req.body.data_url
                }
            }
        };
        const ttl = req.body.ttl || 24 * 60 * 60; //24 hours in seconds
        return pushNotificationService.sendNotifications(payload, ttl).then((results) => {
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
