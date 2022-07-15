import Task from './task.js';

describe('Add/Remove Task', () => {
  test('Add a task to the list', () => {
    document.body.innerHTML = `
    <ul class="list-container"></ul>
    `;
    const testTask = new Task('Hash101', 'Hello World!', 1, false);
    testTask.add();
    const tasks = document.querySelectorAll('.list');
    expect(tasks).toHaveLength(1);
  });
  test('Remove a task to the list', () => {
    document.body.innerHTML = `
    <ul class="list-container"></ul>
    `;
    const testTask = new Task('Hash101', 'Hello World!', 1, false);
    testTask.add();
    document.querySelector('.delete-icon').click();
    const tasks = document.querySelectorAll('.list');
    expect(tasks).toHaveLength(0);
  });
});
describe('Update Description, Mark as completed, Clear all completed', ()=> {
  test('Update Description of the Task', () => {
    const testTask = new Task('Hash102', 'Meet Adonis', 2, false);
    Task.taskArr.push(testTask)
    testTask.add();
    Task.taskArr[0].editDescription('Meet Sam');
    expect(Task.taskArr[0].description).toBe('Meet Sam')
  });
  test('Mark a Task as Completed', () => {
    const testTask = new Task('Hash102', 'Meet Adonis', 2, false);
    Task.taskArr.push(testTask)
    testTask.add();
    document.querySelector('.checkbox').click();
    expect(Task.taskArr[0].completed).toBe(true);
  })
  test('Clear all Completed', () => {
    document.body.innerHTML = `
    <ul class="list-container"></ul>
    `;
    const testTask1 = new Task('Hash101', 'Hello World!', 1, false);
    testTask1.add();
    const testTask2 = new Task('Hash102', 'Hello World!', 2, true);
    testTask2.add();
    const tasks = document.querySelectorAll('.list');
    tasks.forEach((each) => {
      if (each.classList.value.includes('completed')) {
        each.remove();
      }
    });
    const updatedTask = document.querySelectorAll('.list')
    expect(updatedTask).toHaveLength(1);
  })
});