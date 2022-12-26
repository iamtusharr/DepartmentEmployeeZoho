const mongoose = require("mongoose");
const employeeModel = require('../../model/employee')
mongoose.connect('mongodb://localhost:27017/DepartmentEmployeeZoho');


const displayEmployee = async (req, res) => {
    let data = await employeeModel.find();
    console.log("data is coming --> ", data)
    return {
        statusCode: 200,
        body: JSON.stringify(data)
    }
}

module.exports={displayEmployee};