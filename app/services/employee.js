'use strict';
const {employeeGateway} = require('../gateways/index');

module.exports = {
    getAllEmployees() {
        return employeeGateway.getAllEmployees();
    },

    createEmployee(newEmployee) {
        return employeeGateway.createEmployee(newEmployee);
    },

    getEmployeeById(id) {
        return employeeGateway.getEmployeeById(id);
    },

    updateEmployeeById(id, newEmployee) {
        return employeeGateway.updateEmployeeById(id, newEmployee);
    },

    deleteEmployeeById(id) {
        return employeeGateway.deleteEmployeeById(id);
    }
};
