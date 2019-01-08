'use strict';
const employeeModel = require('../models/employee');

module.exports = {
    getAllEmployees() {
        return employeeModel.find().lean();
    },

    createEmployee(newEmployee) {
        return employeeModel.create(newEmployee);
    },

    getEmployeeById(id) {
        return employeeModel.findById(id);
    },

    updateEmployeeById(id, newEmployee) {
        return employeeModel.findByIdAndUpdate(id, newEmployee, {new: true});
    },

    deleteEmployeeById(id) {
        return employeeModel.findByIdAndRemove(id);
    }
};
