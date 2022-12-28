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

const displayEmployeeById = async (req, res) => {
    let deptId = (req.pathParameters._id);
    let result =  employeeModel.find({"deptId" : deptId}).then((data) => {
        if(data.length > 0)
        {
            return{
                statusCode : 200,
                body : JSON.stringify(data)
            }
        }
        else{
            return{
                statusCode : 404,
                body : JSON.stringify("Invalid ID")
            }
        }
    }).catch((error) => {
        return{
            statusCode : 404,
            body : JSON.stringify("invalid ID")
        }
    })
    return result
    

    
}




module.exports={displayEmployee , displayEmployeeById};