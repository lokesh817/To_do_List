let taskToDelete=[]
//Different color for category label

let designcl = ['work','Personal','Claeaning','Others'] //creating class for implementing design to different category 
//$(document).ready(function(){

    let categorys = document.getElementsByClassName('category-label'); // getting all the class name category 
        for(let i=0;i<categorys.length;i++){ // looping in the  categorys to find the which categry class belongs and implement according sesign check home.css to get the color of eact section
            if(categorys[i].innerText=='Work'){ 
               categorys[i].classList.add(designcl[0])
               //categorys[i].classList.add('commonClass')
            }
            else if(categorys[i].innerText=='Personal'){
                categorys[i].classList.add(designcl[1])
                //categorys[i].classList.add('commonClass')
            }else if(categorys[i].innerText=='Claeaning'){
                categorys[i].classList.add(designcl[2])
                //categorys[i].classList.add('commonClass')
            }else if(categorys[i].innerText=='Others'){
                categorys[i].classList.add(designcl[3])
                //categorys[i].classList.add('commonClass')
            }
        }
document.addEventListener('click',function(event){
    if(event.target.className==='check-box'){
        toggletask(event.target.id);
    }
    if(event.target.id==='delete-button'){
        event.preventDefault();
        if(taskToDelete.length>0){
            deleteTask(taskToDelete);
        }
        else{
            alert('no Task To Delete');
        }
    }
})
function toggletask(id){
    if(taskToDelete.includes(id)){
        const newtask=taskToDelete.filter((elem)=>elem!==id);
        taskToDelete=newtask;
    }
    else{
        taskToDelete.push(id);
    }
    console.log(taskToDelete);
}
 async function deleteTask(ids){
    const result=await fetch('/delete-task',{
        method:'post',
        body:JSON.stringify({
            task:ids 
        }),
        headers:{
            "Content-type":"application/json; charset=UTF-8"
        }
    })
    if(result){
        alert('completed task delete');
        window.location.reload();
    }

}