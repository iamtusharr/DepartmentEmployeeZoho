const mongoose = require("mongoose");
const divisionModel = require('../../model/division')
mongoose.connect('mongodb://localhost:27017/DepartmentEmployeeZoho');


const updateDivision = async (req, res) => {
    const temp = JSON.parse(req.body)
    const id = temp._id
    console.log(id);
    if (temp.divName) {
        let divName = temp.divName;
        console.log(divName)
        let checkDivision = await divisionModel.find({ "divName": divName })
        console.log("--> ", checkDivision)
        if (checkDivision.length > 0) {
            console.log("Division Name already exist")
            return {
                statusCode: 404,
                body: JSON.stringify("Division Name Already Exist")
            }
        }
        else {
            let checkID = await divisionModel.findOne({ "_id": id })
            if (checkID == null) {
                console.log("Id Not found");
                return {
                    statusCode: 404,
                    body: JSON.stringify("Invalid ID....")
                }
            }
            else {
                console.log("ID Found");
                let ans = await divisionModel.findByIdAndUpdate(id, { $set: temp }).then(() => {
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
        let checkID = await divisionModel.findOne({ "_id": id })
        if (checkID == null) {
            console.log("Id Not found");
            return {
                statusCode: 404,
                body: JSON.stringify("Invalid ID....")
            }
        }
        else {
            console.log("ID Found");
            let ans = await divisionModel.findByIdAndUpdate(id, { $set: temp }).then(() => {
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


module.exports = { updateDivision }
