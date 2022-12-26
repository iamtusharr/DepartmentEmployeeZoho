const mongoose = require("mongoose");
const employeeModel = require('../../model/employee')
const divisionModel = require('../../model/division')
const departmentModel = require('../../model/department')
mongoose.connect('mongodb://localhost:27017/DepartmentEmployeeZoho');

const updateEmployee = async (req, res) => {
    const temp = JSON.parse(req.body)
    let deptId = temp.deptId;
    let id = temp._id
    if (temp.divisionId) {
        let checkDivisionId = await divisionModel.findById(temp.divisionId);
        if (checkDivisionId == null) {
            console.log("Invalid Division ID");
            return {
                statusCode: 404,
                body: JSON.stringify("You Entered Wrong Division ID")
            }
        }
    }
    let checkDeptId = await departmentModel.findById(deptId);
    if (checkDeptId == null) {
        console.log("You Entered Wrong Department ID");
        return {
            statusCode: 404,
            body: JSON.stringify("You Entered Wrong Department ID")
        }
    }
    let ans = await employeeModel.findByIdAndUpdate(id, { $set: temp }).then((data) => {
        if (data == null) {
            console.log("Invalid Object ID");
            return {
                statusCode: 404,
                body: JSON.stringify("You Entered Wrong Object ID")
            }
        }
        else {
            console.log("Data Updated");
            return {
                statusCode: 200,
                body: JSON.stringify("Data Has Updated....")
            }

        }

    })
    return ans;

}

module.exports = { updateEmployee }