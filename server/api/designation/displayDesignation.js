const mongoose = require("mongoose");
const designationModel = require('../../model/designation')
mongoose.connect('mongodb://localhost:27017/DepartmentEmployeeZoho');


const displayDesignation = async (req, res) => {
    let data = await designationModel.find();
    console.log("data is coming --> ", data)
    return {
        statusCode: 200,
        body: JSON.stringify(data)
    }
}

module.exports={displayDesignation};