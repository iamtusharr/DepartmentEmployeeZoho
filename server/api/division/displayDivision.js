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

const displayDivisionById = async (req, res) => {
    let deptId = (req.pathParameters._id);
    let result =  divisionModel.find({"deptId" : deptId}).then((data) => {
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



module.exports={displayDivision , displayDivisionById};