
const mongoose = require("mongoose");
const deptModel = require('../../model/department')
mongoose.connect('mongodb://localhost:27017/DepartmentEmployeeZoho');

const createDept = async (req, res) => {
    const temp = JSON.parse(req.body);
    let deptName = temp.deptName;
    let checkDept = await deptModel.find({ "deptName": deptName })
    if (checkDept.length > 0) {
        console.log("Department Name already exist")
        return {
            statusCode: 404,
            body: JSON.stringify("Department Name Already Exist")
        }
    }
    else {        
        let data = new deptModel(temp);
        let result = await data.save();
        console.log(data);
        return {
            statusCode: 200,
            body: JSON.stringify(result)
        }
    }
}

module.exports={createDept};