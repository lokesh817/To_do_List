//library
const mongoose=require('mongoose');

//connection to database
mongoose.connect('mongodb://127.0.0.1:27017/TO_DO_list_db');

//Aquire coonection to check whether database is connected
const db=mongoose.connection;

//if get error
db.on('error',console.error.bind(console,'connection error'));

//if connected
db.once('open',function(){
    console.log('succesfully connected with database');
})