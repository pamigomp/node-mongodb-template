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

    updateCategoryById(id, updatedCategory) {
        return categoryGateway.updateCategoryById(id, updatedCategory);
    },

    deleteCategoryById(id) {
        return categoryGateway.deleteCategoryById(id);
    }
};
