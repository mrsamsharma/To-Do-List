import './styles/style.css';
import setting from './assets/setting.jpg';
import refresh from './assets/refresh.jpg';
import Task from './modules/taskAdd.js';
import { v4 as uuidv4 } from 'uuid';

const inputEnter = document.querySelector('.task-input');
const enterBtn = document.querySelector('.enter-icon');

document.querySelector('.refresh-icon').setAttribute('src', refresh);

inputEnter.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    e.preventDefault();
    if (inputEnter.value) {
      const taskItem = new Task(uuidv4(), inputEnter.value, Task.taskArr.length + 1, false);
      Task.taskArr.push(taskItem);
      taskItem.add();
      inputEnter.value = '';
      localStorage.setItem('tasks', JSON.stringify(Task.taskArr));
    }
  }
});

enterBtn.addEventListener('click', (e) => {
  e.preventDefault();
  if (inputEnter.value) {
    const taskItem = new Task(uuidv4(), inputEnter.value, Task.taskArr.length, false);
    Task.taskArr.push(taskItem);
    taskItem.add();
    inputEnter.value = '';
  }
});

const tasks = [
  {
    description: 'Workout at evening',
    completed: false,
    index: 2,
  },
  {
    description: 'wash the dishes',
    completed: false,
    index: 0,
  },
  {
    description: 'Make protein shake',
    completed: false,
    index: 1,
  },
  {
    description: 'Meet Bill Gates',
    completed: false,
    index: 3,
  },
];

tasks.sort((a, b) => a.index - b.index);

const listLoad = () => {
  tasks.forEach((each) => {
    const taskList = document.createElement('li');
    taskList.className = 'list';
    const taskLabel = document.createElement('label');
    taskLabel.className = 'list-label';
    taskLabel.setAttribute('for', each.index);
    const checkDescContainer = document.createElement('div');
    checkDescContainer.className = 'description-container';
    const taskCheck = document.createElement('input');
    taskCheck.setAttribute('type', 'checkbox');
    taskCheck.className = 'checkbox';
    checkDescContainer.appendChild(taskCheck);
    const taskDescription = document.createElement('p');
    taskDescription.className = 'para';
    taskDescription.textContent = each.description;
    checkDescContainer.appendChild(taskDescription);
    taskLabel.appendChild(checkDescContainer);
    const moveIcon = document.createElement('img');
    moveIcon.className = 'move-icon';
    moveIcon.src = setting;
    taskLabel.appendChild(moveIcon);
    taskList.appendChild(taskLabel);
    document.querySelector('.list-container').appendChild(taskList);
  });
};

// listLoad();