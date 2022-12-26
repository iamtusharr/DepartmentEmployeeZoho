const mongoose = require("mongoose");
const deptModel = require('../../model/department')
mongoose.connect('mongodb://localhost:27017/DepartmentEmployeeZoho');


const displayDept = async (req, res) => {
    let data = await deptModel.find();
    console.log("data is coming --> ", data)
    return {
        statusCode: 200,
        body: JSON.stringify(data)
    }
}

module.exports={displayDept};