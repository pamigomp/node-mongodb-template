'use strict';
const {imageGateway, productGateway} = require('../gateways/index');

module.exports = {
    getAllImages() {
        return imageGateway.getAllImages();
    },

    createImage(newImage) {
        return imageGateway.createImage(newImage);
    },

    getImageById(id) {
        return imageGateway.getImageById(id);
    },

    updateImageById(id, newImage) {
        return imageGateway.updateImageById(id, newImage);
    },

    deleteImageById(id) {
        return imageGateway.deleteImageById(id);
    },

    getAllImagesForProductWithId(id) {
        return imageGateway.getImagesByProductId(id);
    },

    createImageForProductWithId(id, newImage) {
        const res = {};
        return productGateway.getProductById(id).then((product) => {
            res.product = product;
            if (product) {
                return imageGateway.createImage(newImage);
            } else {
                return Promise.resolve();
            }
        }).then((image) => {
            res.image = image;
            return res;
        });
    }
};
