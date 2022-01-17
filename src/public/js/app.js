const buttonSendTask = document.querySelector('.send-task');
const formTask = document.getElementById('form-task');
const url = window.location.href;
var listTask = document.getElementById('tasks');
var idTask = null;

//View modal
const showModal = () => {
    let modal = document.querySelector('#modal-add');
    const myModal = new bootstrap.Modal(modal);
    myModal.show();
}

//Open modal
document.querySelector('.modal-add-open').onclick = () => showModal();

//Send task to server
buttonSendTask.addEventListener('click', async (e) => {
    e.preventDefault();
    let title = document.getElementById('title').value;
    let description = document.getElementById('description').value;
    let task = { title, description };
    if (title === '' && description === '') {
        alertsInputs('Please complete all fields','danger',formTask);
        return false;
    }
    if (title !== '' && description !== '') {
        if (idTask !== null) {
            await updateTask(task,idTask);
        }
        else{
            await addTask(task);
            formTask.reset();
        }
    }
    viewTasks();
});

//Reset modal
document.querySelectorAll('.close-modal').forEach(button => {
    button.addEventListener('click', () => { 
        formTask.reset();
        idTask = null;
    });
});


const addTask = async (task) => {
    try{
    const response =  await fetch(url + 'add-task',{
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(task)
    });
    const result = await response.json();
    return alertMessage(result.icon,result.message);
    }
    catch(error){
        console.log(error);
    }
}

const getTasks = async () => {
    try{
        const response = await fetch(url + 'tasks');
        const result = await response.json();
        return result;
    }
    catch(error){
        console.log(error);
    }
}
const viewTasks = async () => {
    const task = await getTasks();
    listTask.innerHTML = '';
    task.forEach((item,index) => {
        listTask.innerHTML += `<tr>
        <td>${index + 1}</td>
        <td>${item.title}</td>
        <td>${item.description}</td>
        <td>
            <button class="btn btn-warning edit-task" onclick="editTask('${item._id}','${item.title}', '${item.description}')"><i class="fas fa-edit"></i></button>
            <button class="btn btn-danger" onclick="modalDelete('${item._id}')"><i class="far fa-trash-alt"></i></button>
        </td>
        </tr>`
    });
}
viewTasks();

//Add task for update
const editTask = (id,title,description) => {
    showModal();
    document.getElementById('title').value = title;
    document.getElementById('description').value =  description;
    idTask = id;
}

const updateTask = async (task,id) => {
    try {
        const response = await fetch(url + id + '/update-task',{
            method: 'PUT',
            headers:{
                'Content-type': 'application/json'
            },
            body: JSON.stringify(task)
            });
        const result = await response.json();
        return alertMessage(result.icon,result.message);
    } catch (error) {
         console.log(error);
    }
}

const deleteTask = async (id) => {
    try {
        const response = await fetch(url + id + '/delete-task',{
            method: 'DELETE',
            body: id
        });
        const result = await response.json();
        alertMessage(result.icon,result.message);
        return viewTasks();
    } catch (error) {
        console.log(error);
    }
}

