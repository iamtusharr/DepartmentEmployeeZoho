const mongoose = require("mongoose");
const designationModel = require('../../model/designation')
mongoose.connect('mongodb://localhost:27017/DepartmentEmployeeZoho');

const checkDesignation = async (DesignationName) => {
    let result = await designationModel.findOne({ "designationName": DesignationName });    
    // console.log(result)
    if (result != null) {     
        return false;
    }    
    return true;
}

const updateDesignation = async (req, res) => {

    let newData = await JSON.parse(req.body);
    let temp = designationModel.findById(newData._id).then(async (result) => {
        let Store = await checkDesignation(newData.designationName)
        if (result != null) {            
            if(Store)
            {
                console.log("Designation Name not exist");
                let query = designationModel.findByIdAndUpdate(newData._id,{$set : newData}).then((data) =>{
                    return{
                        statusCode : 200,
                        body : JSON.stringify(data)
                    }
                })
                return query;
            }
            return{
                statusCode : 404,
                body : JSON.stringify("Designation Name Already Exist")
            }
        }
    }).catch((err) => {
        return {
            statusCode: 404,
            body: "Invalid ID"
        }
    })
    return temp;
}


module.exports = { updateDesignation }
