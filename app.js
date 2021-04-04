let inputAddTask = document.querySelector(".js-input-add");
let buttonAddTask = document.querySelector(".js-button-add");
let tasksTodo = document.querySelector(".js-tasks-todo");
let tasksDone = document.querySelector(".js-tasks-done");

buttonAddTask.onclick = addTask;
buttonAddTask.addEventListener("click", addTask);
buttonAddTask.addEventListener("click", ajaxRequest);

for (let i = 0; i < tasksTodo.children.length; i++) {
  bindTaskEvents(tasksTodo.children[i], taskCompleted);
}

for (let i = 0; i < tasksDone.children.length; i++) {
  bindTaskEvents(tasksDone.children[i], taskIncomplete);
}

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

  if (!inputAddTask.value) return;
  let listItem = createNewTaskElement(inputAddTask.value);

  tasksTodo.appendChild(listItem);
  bindTaskEvents(listItem, taskCompleted);

  inputAddTask.value = "";
}

function editTask() {
  console.log("Edit Task...");
  console.log("Change 'edit' to 'save'");

  let listItem = this.parentNode;

  let editInput = listItem.querySelector(".todo-app__input");
  let label = listItem.querySelector(".todo-app__label");
  let editBtn = listItem.querySelector(".js-button-edit");

  if (listItem.classList.contains("todo-app__task-item_edit")) {
    label.innerText = editInput.value;
    editBtn.innerText = "Edit";
  } else {
    editInput.value = label.innerText;
    editBtn.innerText = "Save";
  }

  listItem.classList.toggle("todo-app__task-item_edit");
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
  tasksDone.appendChild(listItem);
  bindTaskEvents(listItem, taskIncomplete);
}

function taskIncomplete() {
  console.log("Incomplete Task...");
  let listItem = this.parentNode;
  tasksTodo.appendChild(listItem);
  bindTaskEvents(listItem, taskCompleted);
}

function ajaxRequest() {
  console.log("AJAX Request");
}

function bindTaskEvents(taskListItem, checkBoxEventHandler) {
  console.log("bind list item events");

  let checkBox = taskListItem.querySelector(".todo-app__check");
  let editButton = taskListItem.querySelector(".js-button-edit");
  let deleteButton = taskListItem.querySelector(".js-button-delete");

  editButton.onclick = editTask;
  deleteButton.onclick = deleteTask;
  checkBox.onchange = checkBoxEventHandler;
}
