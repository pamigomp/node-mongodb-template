'use strict';
const imageModel = require('../models/image');

const getImages = (query) => {
    return imageModel.find(query).lean();
};

const deleteImage = (query) => {
    return imageModel.findOneAndRemove(query);
};

module.exports = {
    getAllImages() {
        const query = {};
        return getImages(query);
    },

    createImage(newImage) {
        return imageModel.create(newImage);
    },

    getImageById(id) {
        return imageModel.findById(id);
    },

    updateImageById(id, newImage) {
        return imageModel.findByIdAndUpdate(id, newImage, {new: true});
    },

    deleteImageById(id) {
        return imageModel.findByIdAndRemove(id);
    },

    getImagesByProductId(id) {
        const query = {productId: id};
        return getImages(query);
    },

    deleteImageByProductId(id) {
        const query = {productId: id};
        return deleteImage(query);
    }
};
