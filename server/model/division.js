const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
        deptId : {
            type :  mongoose.Types.ObjectId
        },
        divName: {
            type : String,            
            trim : true                       
        },        
        divDesc : {
            type : String,
            trim : true                   
        }
    }, { collection: 'Division' });
const divisionModel = mongoose.model('Division',userSchema)
module.exports =  divisionModel;