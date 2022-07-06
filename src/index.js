import {v4 as uuidv4} from 'uuid';
import './styles/main.css';
import enter from './assets/enter.png';
import setting from './assets/setting.png';

let tasks = [
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
    description: 'Workout at evening',
    completed: false,
    index: 2,
  },
  {
    description: 'Meet Bill Gates',
    completed: false,
    index: 3,
  },
];

const listLoad = () => { 
  tasks.forEach((each) => {
  const taskList = document.createElement('li');
  taskList.className = 'list';
  const taskLabel = document.createElement('label');
  taskLabel.className = 'list-label';
  taskLabel.setAttribute('for', each.index);
  const taskCheck = document.createElement('input');
  taskCheck.setAttribute('type', 'checkbox');
  taskCheck.className = 'checkbox';
  taskLabel.appendChild(taskCheck);
  const taskDescription = document.createElement('p');
  taskDescription.className = 'para';
  taskDescription.textContent = each.description;
  taskLabel.appendChild(taskDescription);
  const moveIcon = document.createElement('img');
  moveIcon.className = 'move-icon';
  moveIcon.src = '../../dist/setting.png';
  taskLabel.appendChild(moveIcon);
  taskList.appendChild(taskLabel);
  document.querySelector('.list-container').appendChild(taskList);
});
}

listLoad();