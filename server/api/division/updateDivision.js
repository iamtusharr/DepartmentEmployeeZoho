const mongoose = require("mongoose");
const divisionModel = require('../../model/division')
mongoose.connect('mongodb://localhost:27017/DepartmentEmployeeZoho');


const checkDivision = async (divisionName) => {
    let result = await divisionModel.findOne({ "divName": divisionName });
    // console.log(result)
    if (result != null) {
        return false;
    }
    return true;
}


const updateDivision = async (req, res) => {
 



    let newData = await JSON.parse(req.body);
    try {
        let temp = await divisionModel.findOne({ "_id": newData._id })
        if (temp != null) {            
            let Store = await checkDivision(newData.divName)
            if (Store) {
                console.log("Division Name not exist");
                let query = divisionModel.findByIdAndUpdate(newData._id, { $set: newData }).then((data) => {
                    return {
                        statusCode: 200,
                        body: JSON.stringify("Data Updated")
                    }
                })
                return query;
            }
            return {
                statusCode: 404,
                body: JSON.stringify("Division Name Already Exist")
            }

        } else {
            return {
                statusCode: 404,
                body: "Invalid ID"
            }
        }
    }
    catch(error) 
    {
        return{
            statusCode : 404,
            body : JSON.stringify("Invalid ID")
        }
    }
}
    





module.exports = { updateDivision }
