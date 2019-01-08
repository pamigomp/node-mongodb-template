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

    updateCustomerById(id, newCustomer) {
        return customerGateway.updateCustomerById(id, newCustomer);
    },

    deleteCustomerById(id) {
        return customerGateway.deleteCustomerById(id);
    }
};
