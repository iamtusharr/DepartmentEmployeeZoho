const mongoose = require("mongoose");
const divisionModel = require('../../model/division')
mongoose.connect('mongodb://localhost:27017/DepartmentEmployeeZoho');


const displayDivision = async (req, res) => {
    let data = await divisionModel.find();
    console.log("data is coming --> ", data)
    return {
        statusCode: 200,
        body: JSON.stringify(data)
    }
}

module.exports={displayDivision};