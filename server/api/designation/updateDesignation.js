

const mongoose = require("mongoose");
const designationModel = require('../../model/designation')


const checkDesignation = async (designationName) => {
    let result = await designationModel.findOne({ "designationName": designationName });    
    if (result != null) {     
        return false;
    }    
    return true;


}

const updateDesignation = async (req, res) => {
    mongoose.connect('mongodb://localhost:27017/DepartmentEmployeeZoho');
    
    let newData = await JSON.parse(req.body);
    let temp = designationModel.findById(newData._id)
    .then(async (result) => {
        // console.log(result)
        let Store = await checkDesignation(newData.designationName)
        if (result != null) {
            
            if(Store)
            {
                console.log("Designation Name not exist");
                let query = designationModel.findByIdAndUpdate(newData._id,{$set : newData}).then((data) =>{
                    return{
                        statusCode : 200,
                        body : JSON.stringify("data updated")
                    }
                })
                return query;
            }
            return{
                statusCode : 404,
                body : JSON.stringify("Designation Name Already Exist")
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
}


module.exports = { updateDesignation }

