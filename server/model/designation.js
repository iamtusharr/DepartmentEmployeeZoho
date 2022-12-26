const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
        deptId : {
            type :  mongoose.Types.ObjectId
        },
        designationName: {
            type : String,            
            trim : true                       
        },        
        designationDesc : {
            type : String,
            trim : true                   
        }
    }, { collection: 'Designation' });
const designationModel = mongoose.model('Designation',userSchema)
module.exports =  designationModel;