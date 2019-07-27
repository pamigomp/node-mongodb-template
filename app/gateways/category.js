'use strict';
const categoryModel = require('../models/category');

module.exports = {
    getAllCategories() {
        return categoryModel.find().select(['-createdAt', '-updatedAt', '-__v']).lean();
    },

    createCategory(newCategory) {
        return categoryModel.create(newCategory);
    },

    getCategoryById(id) {
        return categoryModel.findById(id).select(['-createdAt', '-updatedAt', '-__v']);
    },

    updateCategoryById(id, updatedCategory) {
        return categoryModel.findByIdAndUpdate(id, updatedCategory, {new: true});
    },

    deleteCategoryById(id) {
        return categoryModel.findByIdAndRemove(id);
    }
};
