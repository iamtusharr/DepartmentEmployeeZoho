const mongoose = require("mongoose");
const deptModel = require('../../model/department')


const checkDept = async (deptName) => {
    let result = await deptModel.findOne({ "deptName": deptName });    
    // console.log(result)
    if (result != null) {     
        return false;
    }    
    return true;
}

const updateDept = async (req, res) => {
    mongoose.connect('mongodb://localhost:27017/DepartmentEmployeeZoho');
    
    let newData = await JSON.parse(req.body);
    let temp = deptModel.findById(newData._id)
    .then(async (result) => {
        // console.log(result)
        let Store = await checkDept(newData.deptName)
        if (result != null) {            
            if(Store)
            {
                console.log("Dept Name not exist");
                let query = deptModel.findByIdAndUpdate(newData._id,{$set : newData}).then((data) =>{
                    return{
                        statusCode : 200,
                        body : JSON.stringify("data updated")
                    }
                })
                return query;
            }
            return{
                statusCode : 404,
                body : JSON.stringify("Dept Name Already Exist")
            }
        }
        else{
            return {
                statusCode: 404,
                body: "Invalid ID"
            }
        }
    })
    .catch((err) => {
        return {
            statusCode: 404,
            body: "Invalid ID"
        }
    })
    return temp;
    // return{
    //     statusCode:200,
    //     body:"done"
    // }
}


module.exports = { updateDept }
