const mongoose = require("mongoose");
const designationModel = require('../../model/designation')
mongoose.connect('mongodb://localhost:27017/DepartmentEmployeeZoho');


const updateDesignation = async (req, res) => {
    const temp = JSON.parse(req.body)
    const id = temp._id
    console.log(id);
    if (temp.designationName) {
        let designationName = temp.designationName;
        console.log(designationName)
        let checkDesignation = await designationModel.find({ "designationName": designationName })
        console.log("--> ", checkDesignation)
        if (checkDesignation.length > 0) {
            console.log("Designation Name already exist")
            return {
                statusCode: 404,
                body: JSON.stringify("Division Name Already Exist")
            }
        }
        else {
            let checkID = await designationModel.findOne({ "_id": id })
            if (checkID == null) {
                console.log("Id Not found");
                return {
                    statusCode: 404,
                    body: JSON.stringify("Invalid ID....")
                }
            }
            else {
                console.log("ID Found");
                let ans = await designationModel.findByIdAndUpdate(id, { $set: temp }).then(() => {
                    console.log("Data Updated");
                    return {
                        statusCode: 200,
                        body: JSON.stringify("Data Has Updated....")
                    }
                }).catch(error => {
                    return {
                        statusCode: 404,
                        body: JSON.stringify("Data Has Not Updated....")
                    }
                })
                return ans;
            }

        }

    }
    else {
        let checkID = await designationModel.findOne({ "_id": id })
        if (checkID == null) {
            console.log("Id Not found");
            return {
                statusCode: 404,
                body: JSON.stringify("Invalid ID....")
            }
        }
        else {
            console.log("ID Found");
            let ans = await designationModel.findByIdAndUpdate(id, { $set: temp }).then(() => {
                console.log("Data Updated");
                return {
                    statusCode: 200,
                    body: JSON.stringify("Data Has Updated....")
                }
            }).catch(error => {
                return {
                    statusCode: 404,
                    body: JSON.stringify("Data Has Not Updated....")
                }
            })
            return ans;
        }

    }


}


module.exports = { updateDesignation }
