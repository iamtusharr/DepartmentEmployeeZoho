
const mongoose = require("mongoose");
const divisionModel = require('../../model/Division')
const deptModel = require('../../model/department')
mongoose.connect('mongodb://localhost:27017/DepartmentEmployeeZoho');

const createDivision = async (req, res) => {
    const temp = JSON.parse(req.body);
    console.log(temp);
    let deptId = temp.deptId;
    let findDeptId = await deptModel.findById(deptId);
    if (findDeptId != null) {
        console.log("ID Found");
        let divName = temp.divName;
        let checkDiv = await divisionModel.find({ "divName": divName })
        if (checkDiv.length > 0) {
            console.log("Division Name already exist")
            return {
                statusCode: 404,
                body: JSON.stringify("Division Name Already Exist")
            }
        }
        else {
            let data = new divisionModel(temp);
            let result = await data.save();
            console.log(data);
            return {
                statusCode: 200,
                body: JSON.stringify(result)
            }
        }
    }
    else {
        console.log("ID Not Found")
        return {
            statusCode: 404,
            body: JSON.stringify("Invalid ID Entered")
        }
    }
}

module.exports = { createDivision };