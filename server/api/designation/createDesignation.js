
const mongoose = require("mongoose");
const designationModel = require('../../model/designation')
const deptModel = require('../../model/department')
mongoose.connect('mongodb://localhost:27017/DepartmentEmployeeZoho');

const createDesignation = async (req, res) => {
    const temp = JSON.parse(req.body);
    console.log(temp);
    let deptId = temp.deptId;
    let findDeptId = await deptModel.findById(deptId);
    if (findDeptId != null) {
        console.log("ID Found");
        let designationName = temp.designationName;
        let checkDesignation = await designationModel.find({ "designationName": designationName })
        if (checkDesignation.length > 0) {
            console.log("Designation Name already exist")
            return {
                statusCode: 404,
                body: JSON.stringify("Designation Name Already Exist")
            }
        }
        else {
            let data = new designationModel(temp);
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

module.exports = { createDesignation };