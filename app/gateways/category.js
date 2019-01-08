'use strict';
const categoryModel = require('../models/category');

module.exports = {
    getAllCategories() {
        return categoryModel.find().lean();
    },

    createCategory(newCategory) {
        return categoryModel.create(newCategory);
    },

    getCategoryById(id) {
        return categoryModel.findById(id);
    },

    updateCategoryById(id, newCategory) {
        return categoryModel.findByIdAndUpdate(id, newCategory, {new: true});
    },

    deleteCategoryById(id) {
        return categoryModel.findByIdAndRemove(id);
    }
};
