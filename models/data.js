const mongoose=require('mongoose');
const shortId=require('shortid');

const urlSchema= new mongoose.Schema({
    full:{
        type:String,
        required:true
    },
    short:{
        type:String,
        required:true,
       
    },
    code:{
        type:String,
        required:true,
        
    },
    clicks:{
        type:Number,
        required:true,
        default:0
    }



});

const URL= mongoose.model("URL",urlSchema);
module.exports=URL;