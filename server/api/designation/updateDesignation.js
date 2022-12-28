// const mongoose = require("mongoose");
// const designationModel = require('../../model/designation')
// mongoose.connect('mongodb://localhost:27017/DepartmentEmployeeZoho');

// const checkDesignation = async (DesignationName) => {
//     let result = await designationModel.findOne({ "designationName": DesignationName });    
//     // console.log(result)
//     if (result != null) {     
//         return false;
//     }    
//     return true;
// }

// const updateDesignation = async (req, res) => {
// <<<<<<< HEAD
//     const temp = JSON.parse(req.body)
//     const id = temp._id
//     console.log(id);
//     if (temp.designationName) {
//         let designationName = temp.designationName;
//         console.log(designationName)
//         let checkDesignation = await designationModel.find({ "designationName": designationName })
//         console.log("--> ", checkDesignation)
//         if (checkDesignation.length > 0) {
//             console.log("Designation Name already exist")
//             return {
//                 statusCode: 404,
//                 body: JSON.stringify("Designation Name Already Exist")
//             }
//         }
//         else {
//             let checkID = await designationModel.findOne({ "_id": id })
//             if (checkID == null) {
//                 console.log("Id Not found");
//                 return {
//                     statusCode: 404,
//                     body: JSON.stringify("Invalid ID....")
//                 }
//             }
//             else {
//                 console.log("ID Found");
//                 let ans = await designationModel.findByIdAndUpdate(id, { $set: temp }).then(() => {
//                     console.log("Data Updated");
//                     return {
//                         statusCode: 200,
//                         body: JSON.stringify("Data Has Updated....")
//                     }
//                 }).catch(error => {
//                     return {
//                         statusCode: 404,
//                         body: JSON.stringify("Data Has Not Updated....")
// =======

//     let newData = await JSON.parse(req.body);
//     let temp = designationModel.findById(newData._id).then(async (result) => {
//         let Store = await checkDesignation(newData.designationName)
//         if (result != null) {            
//             if(Store)
//             {
//                 console.log("Designation Name not exist");
//                 let query = designationModel.findByIdAndUpdate(newData._id,{$set : newData}).then((data) =>{
//                     return{
//                         statusCode : 200,
//                         body : JSON.stringify(data)
// >>>>>>> 751742261a7952c69580a58a3e491038e08c9986
//                     }
//                 })
//                 return query;
//             }
//             return{
//                 statusCode : 404,
//                 body : JSON.stringify("Designation Name Already Exist")
//             }
//         }
//     }).catch((err) => {
//         return {
//             statusCode: 404,
//             body: "Invalid ID"
//         }
//     })
//     return temp;
// }


// module.exports = { updateDesignation }

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

