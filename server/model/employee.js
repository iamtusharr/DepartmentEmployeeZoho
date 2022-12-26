const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    deptId: {
        type: mongoose.Types.ObjectId
    },
    divisionId: {
        type: mongoose.Types.ObjectId
    },
    empName: {
        type: String,
        trim: true
    },
    designation: {
        type: String,
        trim: true
    }
}, { collection: 'Employee' });
const employeeModel = mongoose.model('Employee', userSchema)
module.exports = employeeModel;