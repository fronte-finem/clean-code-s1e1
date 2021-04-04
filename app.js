let inputAddTask = document.querySelector(".js-input-add");
let buttonAddTask = document.querySelector(".js-button-add");
let tasksTodo = document.querySelector(".js-tasks-todo");
let tasksDone = document.querySelector(".js-tasks-done");

buttonAddTask.addEventListener("click", onAddTask);
buttonAddTask.addEventListener("click", ajaxRequest);

[...tasksTodo.children].forEach(elem => bindTaskEvents(elem, onTaskDone));
[...tasksDone.children].forEach(elem => bindTaskEvents(elem, onTaskTodo));

function createNewTaskElement(taskString) {
  let taskItem = document.createElement("li");
  let checkBox = document.createElement("input");
  let label = document.createElement("label");
  let editInput = document.createElement("input");
  let editButton = document.createElement("button");
  let deleteButton = document.createElement("button");
  let deleteButtonImg = document.createElement("img");

  deleteButtonImg.className = "todo-app__icon-delete";
  deleteButtonImg.src = "./remove.svg";
  deleteButtonImg.alt = "";

  label.className = "todo-app__label";
  label.innerText = taskString;

  checkBox.className = "todo-app__check";
  checkBox.type = "checkbox";

  editInput.className = "todo-app__input";
  editInput.type = "text";

  editButton.className = "todo-app__button js-button-edit";
  editButton.innerText = "Edit";

  deleteButton.className = "todo-app__button js-button-delete";
  deleteButton.appendChild(deleteButtonImg);

  taskItem.className = "todo-app__task-item";
  taskItem.appendChild(checkBox);
  taskItem.appendChild(label);
  taskItem.appendChild(editInput);
  taskItem.appendChild(editButton);
  taskItem.appendChild(deleteButton);
  return taskItem;
}

function onAddTask() {
  console.log("Add Task...");

  if (!inputAddTask.value) return;
  let taskItem = createNewTaskElement(inputAddTask.value);
  tasksTodo.appendChild(taskItem);
  bindTaskEvents(taskItem, onTaskDone);
  inputAddTask.value = "";
}

function onEditTask() {
  console.log("Edit Task...");
  console.log("Change 'edit' to 'save'");

  let taskItem = this.parentNode;

  let label = taskItem.querySelector(".todo-app__label");
  let editInput = taskItem.querySelector(".todo-app__input");
  let editBtn = taskItem.querySelector(".js-button-edit");

  if (taskItem.classList.contains("todo-app__task-item_edit")) {
    label.innerText = editInput.value;
    editBtn.innerText = "Edit";
  } else {
    editInput.value = label.innerText;
    editBtn.innerText = "Save";
  }

  taskItem.classList.toggle("todo-app__task-item_edit");
};

function onDeleteTask() {
  console.log("Delete Task...");
  let taskItem = this.parentNode;
  let ul = taskItem.parentNode;
  ul.removeChild(taskItem);
}

function onTaskDone() {
  console.log("Complete Task...");
  let taskItem = this.parentNode;
  tasksDone.appendChild(taskItem);
  bindTaskEvents(taskItem, onTaskTodo);
}

function onTaskTodo() {
  console.log("Incomplete Task...");
  let taskItem = this.parentNode;
  tasksTodo.appendChild(taskItem);
  bindTaskEvents(taskItem, onTaskDone);
}

function ajaxRequest() {
  console.log("AJAX Request");
}

function bindTaskEvents(taskItem, checkBoxEventHandler) {
  console.log("bind list item events");

  let checkBox = taskItem.querySelector(".todo-app__check");
  let editButton = taskItem.querySelector(".js-button-edit");
  let deleteButton = taskItem.querySelector(".js-button-delete");

  editButton.onclick = onEditTask;
  deleteButton.onclick = onDeleteTask;
  checkBox.onchange = checkBoxEventHandler;
}
