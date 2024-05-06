const taskInput = document.getElementById('taskInput');
const btnAdd = document.getElementById('btnAdd');
const btnReset = document.getElementById('btnReset');

function addTask() {
   let taskList = JSON.parse(localStorage.getItem('tasks')) || [];

   let newTask = {
      id: Date.now(),
      task: taskInput.value,
   };

   taskList.push(newTask);
   localStorage.setItem('tasks', JSON.stringify(taskList));

   displayTasks();
   taskInput.value = '';
}

function displayTasks() {
   let taskList = JSON.parse(localStorage.getItem('tasks')) || [];
   let taskListElement = document.getElementById('taskList');
   taskListElement.innerHTML = '';

   taskList.forEach((task) => {
      let li = document.createElement('li');
      li.setAttribute('data-task-id', task.id);

      let liText = document.createElement('p');
      liText.textContent = task.task;
      liText.setAttribute('class', 'task');

      let divButton = document.createElement('div');
      divButton.setAttribute('class', 'flexcenter divButton');

      let deleteButton = document.createElement('button');
      deleteButton.textContent = 'Excluir';
      deleteButton.setAttribute('class', 'btnTask btnDelete');
      deleteButton.onclick = () => {
         deleteTask(task.id);
      };

      let editButton = document.createElement('button');
      editButton.textContent = 'Editar';
      editButton.setAttribute('class', 'btnTask btnEdit');
      editButton.onclick = () => {
         editTask(task.id);
      };

      li.appendChild(liText);
      li.appendChild(divButton);
      divButton.appendChild(deleteButton);
      divButton.appendChild(editButton);
      taskListElement.appendChild(li);
   });
}

function editTask(taskId) {
   let taskList = JSON.parse(localStorage.getItem('tasks')) || [];
   let updatedTaskList = taskList.map((task) => {
      if (task.id === taskId) {
         let newTaskEdit = prompt('Digite uma nova tarefa:', task.task);
         task.task = newTaskEdit;
      }
      return task;
   });

   localStorage.setItem('tasks', JSON.stringify(updatedTaskList));
   displayTasks();
}

function deleteTask(taskId) {
   let taskList = JSON.parse(localStorage.getItem('tasks')) || [];
   let updatedTaskList = taskList.filter((task) => {
      return task.id !== taskId;
   });

   localStorage.setItem('tasks', JSON.stringify(updatedTaskList));
   displayTasks();
}

function reset() {
   localStorage.removeItem('tasks');
   location.reload();
}

btnAdd.addEventListener('click', addTask);
taskInput.addEventListener('keypress', (event) => {
   if (event.key === 'Enter') {
      addTask();
   }
});

btnReset.addEventListener('click', reset);

displayTasks();
