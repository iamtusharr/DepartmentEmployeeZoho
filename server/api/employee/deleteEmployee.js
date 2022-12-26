const mongoose = require("mongoose");
const employeeModel = require('../../model/employee')
mongoose.connect('mongodb://localhost:27017/DepartmentEmployeeZoho');


const deleteEmployee = async (req, res) => {
    const temp = JSON.parse(req.body)
    const id = temp._id
    console.log("id is coming --> ", id);    
        let ans = employeeModel.findByIdAndRemove(id).then((data) => {
            if(data == null)
            {
                console.log("Data Not Deleted due to Invalid ID")
                return{
                    statusCode : 404,
                    body : JSON.stringify("Data Not Deleted due to Invalid ID")
                }
            }
            console.log("Data deleted",data);
            return {
                statusCode: 200,
                body: JSON.stringify("Data Deleted")
            }
        })
        return ans;

  
}
module.exports = { deleteEmployee }