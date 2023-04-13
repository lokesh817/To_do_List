const mongoose=require('mongoose');
const to_do_schema=new mongoose.Schema({
    Description:{
        type:String,
        required:true
    },
    Category:{
        type:String,
        required:true
    },
    Due_Date:{
        type:Date,
        required:true
    }
})
const list_schema=mongoose.model('list_schema',to_do_schema);
module.exports=list_schema;