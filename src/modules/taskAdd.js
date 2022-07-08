import setting from '../assets/setting.jpg';
import dustbin from '../assets/dustbin.jpg';


class Task {
  constructor(id, description, index, completed) {
    this.id = id;
    this.description = description;
    this.index = index;
    this.completed = completed;
  }

  static taskArr = [];

  toggleCompleted() {
    this.completed = !this.completed;
  }

  add() {
    const taskList = document.createElement('li');
    taskList.className = 'list';
    taskList.setAttribute('id', this.id);
    const taskLabel = document.createElement('label');
    taskLabel.className = 'list-label';
    taskLabel.setAttribute('for', this.index);
    const checkDescContainer = document.createElement('div');
    checkDescContainer.className = 'description-container';
    const taskCheck = document.createElement('input');
    taskCheck.setAttribute('type', 'checkbox');
    taskCheck.className = 'checkbox';
    if (this.completed) {
      taskList.classList.add('completed');
      taskCheck.setAttribute('checked', 'true');
    }
    taskCheck.addEventListener('change', (e) => {
      Task.markCompleted(e);
      moveIcon.classList.toggle('d-none');
      deleteIcon.classList.toggle('show-delete-icon');
      const selected = Task.taskArr.filter((each) => e.target.parentElement.parentElement.parentElement.id === each.id)[0];
      selected.toggleCompleted();
      localStorage.setItem('tasks', JSON.stringify(Task.taskArr));
    });
    checkDescContainer.appendChild(taskCheck);
    const taskDescription = document.createElement('input');
    taskDescription.className = 'para';
    taskDescription.textContent = this.description;
    taskDescription.setAttribute('type', 'text');
    taskDescription.setAttribute('value', this.description);
    taskDescription.setAttribute('disabled', 'true');
    taskDescription.addEventListener('input', (e) => {
      const selected = Task.taskArr.filter((each) => e.target.parentElement.parentElement.parentElement.id === each.id)[0];
      selected.editDescription(e.target.value);
      localStorage.setItem('tasks', JSON.stringify(Task.taskArr));
    })
    taskDescription.addEventListener('click', () => {
      moveIcon.classList.toggle('d-none');
      deleteIcon.classList.toggle('show-delete-icon');
    });
    checkDescContainer.addEventListener('click', () => {
      taskDescription.removeAttribute('disabled');
      taskDescription.setAttribute('enabled', 'true');
    });
    taskDescription.addEventListener('blur', () => {
      taskDescription.removeAttribute('enabled');
      taskDescription.setAttribute('disabled', 'true');
      moveIcon.classList.toggle('d-none');
      deleteIcon.classList.toggle('show-delete-icon');
    });
    checkDescContainer.appendChild(taskDescription);
    taskLabel.appendChild(checkDescContainer);
    const deleteIcon = document.createElement('i')
    deleteIcon.className = 'delete-icon';
    deleteIcon.addEventListener('click', (e) => {
      Task.remove(e);
      Task.reIndex();
    })
    taskLabel.appendChild(deleteIcon);
    const moveIcon = document.createElement('i');
    moveIcon.className = 'move-icon';
    taskLabel.appendChild(moveIcon);
    taskList.appendChild(taskLabel);
    document.querySelector('.list-container').appendChild(taskList);
  }

  static markCompleted(e) {
    e.target.parentElement.parentElement.parentElement.classList.toggle('completed');
    //Add some style! Change array completed to true
  }

  static remove(e) {
    Task.taskArr = Task.taskArr.filter((each) => e.target.parentElement.parentElement.id !== each.id);
    e.target.parentElement.parentElement.remove();
  }

  static reIndex() {
    const newTask = [];
    for (let i = 0; i < Task.taskArr.length; i += 1) {
      newTask.push({ ...Task.taskArr[i], index: i + 1 })
    }
    Task.taskArr = newTask;
    localStorage.setItem('tasks', JSON.stringify(Task.taskArr));
  }

  editDescription(value) {
    this.description = value;
  }

  static clearAllCompleted() {
    Task.taskArr =  Task.taskArr.filter((each) => !each.completed);
  }
}

if ('tasks' in localStorage) {
  const localData = JSON.parse(localStorage.tasks);
  localData.forEach((each) => {
    const localTask = new Task(each.id, each.description, each.index, each.completed);
    localTask.add();
    Task.taskArr.push(localTask);
  })
}

export default Task;