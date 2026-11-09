function add(){
    let taskTitle=document.getElementById('task-title').value;
    let taskDescription=document.getElementById('description').value;

    let tableResult=document.getElementById('result');

    if(taskTitle.trim()!==""&&taskDescription.trim()!==""){
    let tableHtml=
    `
    <tr>
        <td >${taskTitle}</td>
        <td >${taskDescription}</td>
        <td >
            <span class="badge bg-warning text-dark">Pending</span>
        </td>
        <td >

        <button class="btn btn-success rounded-3" onclick="toggleTask(this)">Mark Completed</button>

        <button class="btn btn-primary rounded-3" onclick="edit(this)">Edit</button>
        <button class="btn btn-danger rounded-3" onclick="Delete(this)">Delete</button>
        </td>
        
    </tr>


    `
    tableResult.innerHTML+=tableHtml;
    saveTask();
    document.getElementById('task-title').value="";
    document.getElementById('description').value="";
    alert("Task Added");
    
    
    

    }
    else{
        alert("Fields cannot be empty");
    }
}

function Delete(button){
let row=button.closest('tr');
row.remove();
saveTask();


}

function edit(button){
    let row=button.closest('tr');
    let tds=row.getElementsByTagName('td');
    
    let newTitle=prompt("Task Title",tds[0].innerText);
    let newDescription=prompt("Task description",tds[1].innerText);


    if(newTitle!==null && newDescription!==null){
        if(newTitle.trim()!==""&&newDescription.trim()!==""){
            tds[0].innerText=newTitle;
            tds[1].innerText=newDescription;
            saveTask();
        }
        else{
            alert("fields cannot be empty");
        }
    }
}

function toggleTask(button){

    let row=button.closest('tr');
    let tds=row.getElementsByTagName('td');
    let status=tds[2].querySelector('span');
    if(status.innerText==="Pending"){
        status.innerText="Completed";
        status.className="badge bg-success text-dark";
        button.innerText="Mark Pending";
        button.className="btn btn-warning rounded-3"
    }
    else{
        status.innerText="Pending";
        status.className="badge bg-warning text-dark";
        button.innerText="Mark Completed";
        button.className="btn btn-success rounded-3"
    }
    saveTask();

}

function saveTask(){
    sessionStorage.setItem("tasks",document.getElementById('result').innerHTML)
}

window.onload=function(){
    let savedTasks=sessionStorage.getItem("tasks");
    if(savedTasks){
        document.getElementById('result').innerHTML=savedTasks;
    }
}