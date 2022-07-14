
import Task from './task.js';

describe('Add/Remove Task', () => {
  test('Add a task to the list', () => {
    document.body.innerHTML = `
    <ul class="list-container"></ul>
    `;
    const testTask = new Task('Hash101', 'Hello World!', 1, false);
    testTask.add();
    const tasks = document.querySelectorAll('.list')
    expect(tasks).toHaveLength(1);
  });
  test('Remove a task to the list', () => {
    document.body.innerHTML = `
    <ul class="list-container"></ul>
    `;
    const testTask = new Task('Hash101', 'Hello World!', 1, false);
    testTask.add();
    document.querySelector('.delete-icon').click();
    const tasks = document.querySelectorAll('.list')
    expect(tasks).toHaveLength(0);
  });
});