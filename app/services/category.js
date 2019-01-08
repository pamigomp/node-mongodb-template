'use strict';
const {categoryGateway} = require('../gateways/index');

module.exports = {
    getAllCategories() {
        return categoryGateway.getAllCategories();
    },

    createCategory(newCategory) {
        return categoryGateway.createCategory(newCategory);
    },

    getCategoryById(id) {
        return categoryGateway.getCategoryById(id);
    },

    updateCategoryById(id, newCategory) {
        return categoryGateway.updateCategoryById(id, newCategory);
    },

    deleteCategoryById(id) {
        return categoryGateway.deleteCategoryById(id);
    }
};
