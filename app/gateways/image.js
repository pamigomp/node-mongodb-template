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
        return imageModel.findById(id).select(['-createdAt', '-updatedAt', '-__v']);
    },

    updateImageById(id, updatedImage) {
        return imageModel.findByIdAndUpdate(id, updatedImage, {new: true});
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
