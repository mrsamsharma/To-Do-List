import setting from '../assets/setting.jpg';


class Task {
  constructor(id, description, index, completed) {
    this.id = id;
    this.description = description;
    this.index = index;
    this.completed = completed;
  }

  static taskArr = [];

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
    taskCheck.addEventListener('change', (e) => {
      Task.markCompleted(e);
    });
    checkDescContainer.appendChild(taskCheck);
    const taskDescription = document.createElement('p');
    taskDescription.className = 'para';
    taskDescription.textContent = this.description;
    taskDescription.setAttribute('contentEditable', 'true');
    checkDescContainer.appendChild(taskDescription);
    taskLabel.appendChild(checkDescContainer);
    const moveIcon = document.createElement('img');
    moveIcon.className = 'move-icon';
    moveIcon.src = setting;
    taskLabel.appendChild(moveIcon);
    taskList.appendChild(taskLabel);
    document.querySelector('.list-container').appendChild(taskList);
  }
  
  static markCompleted(e) {
    e.target.parentElement.parentElement.parentElement.classList.toggle('completed');
   //Add some style! Change array completed to true
  }

}

if ('tasks' in localStorage) {
  Task.taskArr = JSON.parse(localStorage.tasks);
  Task.taskArr.forEach((each) => {
    const localTask = new Task(each.id, each.description, each.index, each.completed);
    localTask.add();
  })
}

export default Task;