let taskInput = document.getElementById("new-task");
let addButton = document.getElementsByTagName("button")[0];
let incompleteTaskHolder = document.getElementById("incomplete-tasks");
let completedTasksHolder = document.getElementById("completed-tasks");


function createNewTaskElement(taskString) {
  let listItem = document.createElement("li");
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

  listItem.className = "todo-app__task-item";
  listItem.appendChild(checkBox);
  listItem.appendChild(label);
  listItem.appendChild(editInput);
  listItem.appendChild(editButton);
  listItem.appendChild(deleteButton);
  return listItem;
}

function addTask() {
  console.log("Add Task...");

  if (!taskInput.value) return;
  let listItem = createNewTaskElement(taskInput.value);

  incompleteTaskHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskCompleted);

  taskInput.value = "";
}

function editTask() {
  console.log("Edit Task...");
  console.log("Change 'edit' to 'save'");

  let listItem = this.parentNode;

  let editInput = listItem.querySelector('input[type = text]');
  let label = listItem.querySelector("label");
  let editBtn = listItem.querySelector(".edit");
  let containsClass = listItem.classList.contains("edit-mode");

  if (containsClass) {
    label.innerText = editInput.value;
    editBtn.innerText = "Edit";
  } else {
    editInput.value = label.innerText;
    editBtn.innerText = "Save";
  }

  listItem.classList.toggle("edit-mode");
};

function deleteTask() {
  console.log("Delete Task...");

  let listItem = this.parentNode;
  let ul = listItem.parentNode;
  ul.removeChild(listItem);
}

function taskCompleted() {
  console.log("Complete Task...");

  let listItem = this.parentNode;
  completedTasksHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskIncomplete);
}

function taskIncomplete() {
  console.log("Incomplete Task...");
  let listItem = this.parentNode;
  incompleteTaskHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskCompleted);
}

function ajaxRequest() {
    console.log("AJAX Request");
}

addButton.onclick = addTask;
addButton.addEventListener("click", addTask);
addButton.addEventListener("click", ajaxRequest);

function bindTaskEvents(taskListItem, checkBoxEventHandler) {
  console.log("bind list item events");

  let checkBox = taskListItem.querySelector("input[type = checkbox]");
  let editButton = taskListItem.querySelector("button.edit");
  let deleteButton = taskListItem.querySelector("button.delete");

  editButton.onclick = editTask;
  deleteButton.onclick = deleteTask;
  checkBox.onchange = checkBoxEventHandler;
}

for (let i = 0; i < incompleteTaskHolder.children.length; i++) {
  bindTaskEvents(incompleteTaskHolder.children[i], taskCompleted);
}

for (let i = 0; i < completedTasksHolder.children.length; i++) {
  bindTaskEvents(completedTasksHolder.children[i], taskIncomplete);
}
