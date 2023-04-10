//required modules
const express=require('express');
const path=require('path');
//define port to run express 
const port=8000;
const app=express();

const db=require('./config/mongoose');
const list_schema=require('./models/list_schema');

app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));
app.use(express.urlencoded());
app.use(express.static('assets'));

app.get('/',function(req,res){
    list_schema.find()
    .then(function(ToDoList){
        return res.render('home',{
            title:'Home',
            To_Do_List:ToDoList
        });
    })
    .catch(function(err){
        console.log("error",err);
    })
});
app.post('/create-task/',function(req,res){
    list_schema.create({
        Discription:req.body.Discription,
        Category:req.body.Category,
        Due_Date:req.body.Due_Date
    });
    return res.redirect('back');
})
app.get('/delete-task',function(req,res){
    const id=req.query.id;
    list_schema.findByIdAndDelete(id)
    .then(function(){
        console.log('deleted task');
        return res.redirect('back');
    })
    .catch(function(err){
        console.log('not deleted');
        return res.redirect('back');
    })
})



app.listen(port,function(err){
    if(err){
        console.log(`Can not connect to server ${err}`);
    }
    console.log('server is running on port',port);
})