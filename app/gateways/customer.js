'use strict';
const customerModel = require('../models/customer');

module.exports = {
    getAllCustomers() {
        return customerModel.find().lean();
    },

    createCustomer(newCustomer) {
        return customerModel.create(newCustomer);
    },

    getCustomerById(id) {
        return customerModel.findById(id);
    },

    updateCustomerById(id, newCustomer) {
        return customerModel.findByIdAndUpdate(id, newCustomer, {new: true});
    },

    deleteCustomerById(id) {
        return customerModel.findByIdAndRemove(id);
    }
};
