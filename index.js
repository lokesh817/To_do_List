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
app.use(express.json());
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
    // let options={ weekday: 'long',years: 'numeric', month: 'long', day: 'numeric'};
    // let date=new date(req.body.Due_Date);
    // let day=date.toLocaleDateString("en-us",options);
    list_schema.create({
        Description:req.body.Description,
        Category:req.body.Category,
        //Due_Date:day
        Due_Date:req.body.Due_Date
    });
    return res.redirect('back');
})
app.post('/delete-task',async function(req,res){
    try{
        const task=req.body.task;
        for( let i of task){
            await list_schema.findByIdAndDelete({_id:i});
        }
        return res.redirect('back');
    }
    catch(error){
        console.log(error);
    }
})



app.listen(port,function(err){
    if(err){
        console.log(`Can not connect to server ${err}`);
    }
    console.log('server is running on port',port);
})