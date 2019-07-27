'use strict';
const {customerGateway} = require('../gateways/index');

module.exports = {
    getAllCustomers() {
        return customerGateway.getAllCustomers();
    },

    createCustomer(newCustomer) {
        return customerGateway.createCustomer(newCustomer);
    },

    getCustomerById(id) {
        return customerGateway.getCustomerById(id);
    },

    updateCustomerById(id, updatedCustomer) {
        return customerGateway.updateCustomerById(id, updatedCustomer);
    },

    deleteCustomerById(id) {
        return customerGateway.deleteCustomerById(id);
    }
};
