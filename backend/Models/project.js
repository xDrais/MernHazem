const mongoose = require ('mongoose')

const ProjectSchema = new mongoose.Schema({
    projectCreator : {type: mongoose.Types.ObjectId,required:true,ref:"User"},
    name : {type : String , required : true },
    description : {type : String , required : true },
    dateStart: {type : Date , required : false ,default: Date.now() },
    imageUrl: {type:String},

})
module.exports = mongoose.model('Project', ProjectSchema)
