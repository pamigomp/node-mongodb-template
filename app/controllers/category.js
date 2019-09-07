'use strict';
const {categoryService} = require('../services/index');
const logger = require('../../libs/logger');

module.exports = {
    getAllCategories(req, res, next) {
        return categoryService.getAllCategories().then((categories) => {
            res.status(200).send(categories);
        }).catch(next);
    },

    createCategory(req, res, next) {
        return categoryService.createCategory(req.body).then((category) => {
            const msg = `Category with ID: ${category._id} was successfully created`;
            logger.info(msg);
            res.status(201).send({message: msg});
        }).catch(next);
    },

    getCategory(req, res, next) {
        return categoryService.getCategoryById(req.params.categoryId).then((category) => {
            if (!category) {
                const msg = `Cannot find category with ID ${req.params.categoryId}`;
                logger.warn(msg);
                res.status(400).send({message: msg});
            } else {
                res.status(200).send(category);
            }
        }).catch(next);
    },

    updateCategory(req, res, next) {
        return categoryService.updateCategoryById(req.params.categoryId, req.body).then((category) => {
            if (!category) {
                const msg = `Cannot find category with ID ${req.params.categoryId}`;
                logger.warn(msg);
                res.status(400).send({message: msg});
            } else {
                const msg = `Category with ID: ${category._id} was successfully updated`;
                logger.info(msg);
                res.status(200).send({message: msg});
            }
        }).catch(next);
    },

    deleteCategory(req, res, next) {
        return categoryService.deleteCategoryById(req.params.categoryId).then((category) => {
            if (!category) {
                const msg = `Cannot find category with ID ${req.params.categoryId}`;
                logger.warn(msg);
                res.status(400).send({message: msg});
            } else {
                const msg = `Category with ID: ${category._id} was successfully deleted`;
                logger.info(msg);
                res.status(200).send({message: msg});
            }
        }).catch(next);
    }
};
