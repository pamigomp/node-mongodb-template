'use strict';
const {productService} = require('../services/index');
const logger = require('../../libs/logger');

module.exports = {
    getProduct(req, res, next) {
        return productService.getProductById(req.params.productId).then((product) => {
            if (!product) {
                const msg = `Cannot find product with ID ${req.params.productId}`;
                logger.warn(msg);
                res.status(400).send({message: msg});
            } else {
                res.status(200).send(product);
            }
        }).catch(next);
    },

    updateProduct(req, res, next) {
        return productService.updateProductById(req.params.productId, req.body).then((product) => {
            if (!product) {
                const msg = `Cannot find product with ID ${req.params.productId}`;
                logger.warn(msg);
                res.status(400).send({message: msg});
            } else {
                const msg = `Product with ID: ${product._id} was successfully updated`;
                logger.info(msg);
                res.status(200).send({message: msg});
            }
        }).catch(next);
    },

    deleteProduct(req, res, next) {
        return productService.deleteProductById(req.params.productId).then((product) => {
            if (!product) {
                const msg = `Cannot find product with ID ${req.params.productId}`;
                logger.warn(msg);
                res.status(400).send({message: msg});
            } else {
                const msg = `Product with ID: ${product._id} was successfully deleted`;
                logger.info(msg);
                res.status(200).send({message: msg});
            }
        }).catch(next);
    },

    getAllProductsForCategoryWithId(req, res, next) {
        return productService.getAllProductsForCategoryWithId(req.params.categoryId, req.query).then((result) => {
            if (!result || !result.collection || !result.collection.length) {
                const msg = `Cannot find any product for category with ID ${req.params.categoryId}`;
                logger.warn(msg);
                res.status(400).send({message: msg});
            } else {
                res.status(200).send(result);
            }
        }).catch(next);
    },

    createProductForCategoryWithId(req, res, next) {
        return productService.createProductForCategoryWithId(req.params.categoryId, req.body).then((data) => {
            if (!data.category) {
                const msg = `Cannot find category with ID ${req.params.categoryId}`;
                logger.warn(msg);
                res.status(400).send({message: msg});
            } else {
                const msg = `Product with ID: ${data.product._id} was successfully created`;
                logger.info(msg);
                res.status(201).send({message: msg});
            }
        }).catch(next);
    }
};
