'use strict';
const customerModel = require('../models/customer');

module.exports = {
    getAllCustomers() {
        return customerModel.find().select(['-password', '-salt', '-createdAt', '-updatedAt', '-__v']).lean();
    },

    createCustomer(newCustomer) {
        return customerModel.create(newCustomer);
    },

    getCustomerById(id) {
        return customerModel.findById(id).select(['-password', '-salt', '-createdAt', '-updatedAt', '-__v']);
    },

    updateCustomerById(id, updatedCustomer) {
        return customerModel.findByIdAndUpdate(id, updatedCustomer, {new: true});
    },

    deleteCustomerById(id) {
        return customerModel.findByIdAndRemove(id);
    }
};
