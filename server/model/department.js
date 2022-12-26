const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
        deptName: {
            type : String,            
            trim : true                       
        },        
        deptDesc : {
            type : String,
            trim : true                   
        },        
    }, { collection: 'Department' });
const deptModel = mongoose.model('Department',userSchema)
module.exports =  deptModel;