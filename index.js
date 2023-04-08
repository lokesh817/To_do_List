//required modules
const express=require('express');
const path=require('path');
//define port to run express 
const port=8000;
const app=express();

const db=require('./config/mongoose');
const list_schema=require('./models/list_schema');

app.get('/',function(req,res){
    list_schema.find()
    .then(function(ToDoList){
        return res.render('home',{
            title:'Home',
            list:list_schema
        });
    })
    .catch(function(err){
        console.log("error",err);
    })
});
app.post('/create-task',function(req,res){
    list_schema.create({
        Discription:req.body.Discription,
        Category:req.body.Category,
        Due_Date:req.body.Due_Date
    });
})

app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));
app.use(express.urlencoded());
app.use(express.static('./assets'));

app.listen(port,function(err){
    if(err){
        console.log(`Can not connect to server ${err}`);
    }
    console.log('server is running on port',port);
})