const mongoose = require("mongoose");
const deptModel = require('../../model/department')
mongoose.connect('mongodb://localhost:27017/DepartmentEmployeeZoho');


const deleteDept = async (req, res) => {
    const temp = JSON.parse(req.body)
    const id = temp._id
    console.log("id is coming --> ", id);    
        let ans = deptModel.findByIdAndRemove(id).then((data) => {
            if(data == null)
            {
                console.log("Data Not Deleted")
                return{
                    statusCode : 404,
                    body : JSON.stringify("Data Not Deleted")
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
module.exports = { deleteDept }