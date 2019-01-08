'use strict';
const {imageService} = require('../services/index');
const logger = require('../../libs/logger');

module.exports = {
    getImage(req, res, next) {
        return imageService.getImageById(req.params.imageId).then((image) => {
            if (!image) {
                const msg = `Cannot find image with ID ${req.params.imageId}`;
                logger.warn(msg);
                res.status(400).send({message: msg});
            } else {
                res.status(200).send(image);
            }
        }).catch(next);
    },

    updateImage(req, res, next) {
        return imageService.updateImageById(req.params.imageId, req.body).then((image) => {
            if (!image) {
                const msg = `Cannot find image with ID ${req.params.imageId}`;
                logger.warn(msg);
                res.status(400).send({message: msg});
            } else {
                const msg = `Image with ID: ${image._id} was successfully updated`;
                logger.info(msg);
                res.status(200).send({message: msg});
            }
        }).catch(next);
    },

    deleteImage(req, res, next) {
        return imageService.deleteImageById(req.params.imageId).then((image) => {
            if (!image) {
                const msg = `Cannot find image with ID ${req.params.imageId}`;
                logger.warn(msg);
                res.status(400).send({message: msg});
            } else {
                const msg = `Image with ID: ${image._id} was successfully deleted`;
                logger.info(msg);
                res.status(200).send({message: msg});
            }
        }).catch(next);
    },

    getAllImagesForProductWithId(req, res, next) {
        return imageService.getAllImagesForProductWithId(req.params.productId).then((images) => {
            res.status(200).send(images);
        }).catch(next);
    },

    createImageForProductWithId(req, res, next) {
        return imageService.createImageForProductWithId(req.params.productId, req.body).then((data) => {
            if (!data.product) {
                const msg = `Cannot find product with ID ${req.params.productId}`;
                logger.warn(msg);
                res.status(400).send({message: msg});
            } else {
                const msg = `Image with ID: ${data.image._id} was successfully created`;
                logger.info(msg);
                res.status(201).send({message: msg});
            }
        }).catch(next);
    }
};
