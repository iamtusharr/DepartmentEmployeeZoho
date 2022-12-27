const mongoose = require("mongoose");
const deptModel = require('../../model/department')
mongoose.connect('mongodb://localhost:27017/DepartmentEmployeeZoho');


const updateDept = async (req, res) => {
    const temp = JSON.parse(req.body)
    const id = temp._id
    console.log(id);
    if (temp.deptName) {
        let deptName = temp.deptName;
        console.log(deptName)
        let checkDept = await deptModel.find({ "deptName": deptName })
        console.log("--> ", checkDept)
        if (checkDept.length > 0) {
            console.log("Department Name already exist")
            return {
                statusCode: 404,
                body: JSON.stringify("Department Name Already Exist")
            }
        }
        else {
            let checkID = await deptModel.findOne({ "_id": id })
            if (checkID == null) {
                console.log("Id Not found");
                return {
                    statusCode: 404,
                    body: JSON.stringify("Invalid ID....")
                }
            }
            else {
                console.log("ID Found");
                let ans = await deptModel.findByIdAndUpdate(id, { $set: temp }).then((data) => {
                    if(data != null){
                        console.log("Data Updated");
                        return {
                            statusCode: 200,
                            body: JSON.stringify("Data Has Updated....")
                        }
                    }
                    else
                    {
                        return {
                            statusCode: 404,
                            body: JSON.stringify("Data Has Not Updated....")
                        }
                    }
                })
                return ans;
            }

        }

    }
    else {
        let checkID = await deptModel.findOne({ "_id": id })
        if (checkID == null) {
            console.log("Id Not found");
            return {
                statusCode: 404,
                body: JSON.stringify("Invalid ID....")
            }
        }
        else {
            console.log("ID Found");
            let ans = await deptModel.findByIdAndUpdate(id, { $set: temp }).then(() => {
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
            // console.log(ans);
            return ans;
        }

    }


}


module.exports = { updateDept }
