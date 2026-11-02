const form = document.getElementById('task-form');
const taskInput = document.getElementById('task-input');
const deadlineInput = document.getElementById('deadline-input');
const taskList = document.getElementById('task-list');

// Load tasks from LocalStorage if available
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

function renderTasks() {
  taskList.innerHTML = '';

  tasks.forEach((task, index) => {
    const li = document.createElement('li');
    li.className = `task-item ${task.completed ? 'completed' : ''}`;
    
    li.innerHTML = `
      <div class="task-info">
        <span class="task-text" onclick="toggleTask(${index})">${task.text}</span>
        <span class="task-deadline">📅 Due: ${task.deadline}</span>
      </div>
      <div class="task-actions">
        <button class="btn-complete" onclick="toggleTask(${index})">${task.completed ? 'Undo' : 'Done'}</button>
        <button class="btn-delete" onclick="deleteTask(${index})">Delete</button>
      </div>
    `;
    taskList.appendChild(li);
  });

  localStorage.setItem('tasks', JSON.stringify(tasks));
}

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const newTask = {
    text: taskInput.value,
    deadline: deadlineInput.value,
    completed: false
  };

  tasks.push(newTask);
  renderTasks();

  taskInput.value = '';
  deadlineInput.value = '';
});

function toggleTask(index) {
  tasks[index].completed = !tasks[index].completed;
  renderTasks();
}

function deleteTask(index) {
  tasks.splice(index, 1);
  renderTasks();
}

// Initial Render
renderTasks();
