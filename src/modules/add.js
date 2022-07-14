const add = (id, description, index, completed) => {
  const taskList = document.createElement('li');
  const moveIcon = document.createElement('i');
  const deleteIcon = document.createElement('i');
  const taskLabel = document.createElement('label');
  const taskCheck = document.createElement('input');
  taskList.className = 'list';
  taskList.setAttribute('id', id);
  taskLabel.className = 'list-label';
  taskLabel.setAttribute('for', index);
  const checkDescContainer = document.createElement('div');
  checkDescContainer.className = 'description-container';
  taskCheck.setAttribute('type', 'checkbox');
  taskCheck.className = 'checkbox';
  if (completed) {
    taskList.classList.add('completed');
    taskCheck.setAttribute('checked', 'true');
  }
  taskCheck.addEventListener('change', (e) => {
    Task.markCompleted(e);
    moveIcon.classList.toggle('d-none');
    deleteIcon.classList.toggle('show-delete-icon');
    const pElement = e.target.parentElement.parentElement.parentElement;
    const selected = Task.taskArr.filter((each) => pElement.id === each.id)[0];
    selected.toggleCompleted();
    localStorage.setItem('tasks', JSON.stringify(Task.taskArr));
  });
  checkDescContainer.appendChild(taskCheck);
  const taskDescription = document.createElement('input');
  taskDescription.className = 'para';
  taskDescription.textContent = description;
  taskDescription.setAttribute('type', 'text');
  taskDescription.setAttribute('value', description);
  taskDescription.setAttribute('disabled', 'true');
  taskDescription.addEventListener('input', (e) => {
    const pElement = e.target.parentElement.parentElement.parentElement;
    const selected = Task.taskArr.filter((each) => pElement.id === each.id)[0];
    selected.editDescription(e.target.value);
    localStorage.setItem('tasks', JSON.stringify(Task.taskArr));
  });
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
  deleteIcon.className = 'delete-icon';
  deleteIcon.addEventListener('click', (e) => {
    Task.remove(e);
    Task.reIndex();
  });
  taskLabel.appendChild(deleteIcon);
  moveIcon.className = 'move-icon';
  taskLabel.appendChild(moveIcon);
  taskList.appendChild(taskLabel);
  document.querySelector('.list-container').appendChild(taskList);
};