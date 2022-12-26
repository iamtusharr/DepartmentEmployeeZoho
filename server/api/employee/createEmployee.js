
const mongoose = require("mongoose");
const employeeModel = require('../../model/employee')
const divisionModel = require('../../model/division')
const departmentModel = require('../../model/department')
mongoose.connect('mongodb://localhost:27017/DepartmentEmployeeZoho');

const createEmployee = async (req, res) => {
    const temp = JSON.parse(req.body);
    console.log(temp)
    let checkDeptID = await departmentModel.findById(temp.deptId);    
    if(checkDeptID == null)
    {
        console.log("Invalid Dept ID")
        return{
            statusCode : 404,
            body : JSON.stringify("Invalid Dept ID")
        }
    }
    if(temp.divisionId)
    {
        let checkDivisionID = await divisionModel.findById(temp.divisionId);
        if(checkDivisionID == null)
        {
            console.log("Invalid Division ID")
            return{
                statusCode : 404,
                body : JSON.stringify("Invalid Division ID")
            }
        }
    }    

    let data = new employeeModel(temp);
    let result = await data.save();
    console.log(data);
    return {
        statusCode: 200,
        body: JSON.stringify(result)
    }
}

module.exports = { createEmployee };