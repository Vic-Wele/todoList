//getting all the elements and tags
const inputBox = document.getElementById("input-field");
const addBtn = document.getElementById("input-btn");
const todoList = document.getElementById("todoList");
const pendingNum = document.getElementById("pendingNum");
const deleteAllTasks = document.getElementById("footer-btn");

// this function toggles the active properties from the CSS to do
// button pending on whether the input field is empty or has a value
//================================================================================================================================>

inputBox.onkeyup = () => {
  let userData = inputBox.value;
  if (userData.trim() != 0) {
    addBtn.classList.add("active");
  } else {
    addBtn.classList.remove("active");
  }
};

showTasks();

//this function creates a new todo variable in the local storage to
//hold all list items, and if it's empty, the listArr will display nothing
// else it'll display the values from the New Todo in local storage ==============================================================>

addBtn.onclick = () => {
  let userData = inputBox.value;
  let getLocalStorage = localStorage.getItem("New Todo");
  if (getLocalStorage === null) {
    listArr = [];
  } else {
    listArr = JSON.parse(getLocalStorage);
  }
  listArr.push(userData);
  localStorage.setItem("New Todo", JSON.stringify(listArr));
  showTasks();
};

// this function now loops through the listArr and displays them in the innerHtml of the todoList.
// it also checks to see if length of todoList is 0, if 0, it removes the active css class property
//and vice versa ==========================================================================================================================>

function showTasks() {
  let getLocalStorage = localStorage.getItem("New Todo");
  if (getLocalStorage === null) {
    listArr = [];
  } else {
    listArr = JSON.parse(getLocalStorage);
  }
  pendingNum.textContent = listArr.length;
  if (listArr.length > 0) {
    deleteAllTasks.classList.add("active");
  } else {
    deleteAllTasks.classList.remove("active");
  }
  let newLiTag = "";
  listArr.forEach((element, index) => {
    newLiTag += `<li> ${element}<span onclick="deleteTasks(${index})";><i class="fas fa-trash"></i></span></li>`;
  });
  todoList.innerHTML = newLiTag;
  inputBox.value = "";
}

//this function deletes specific tasks when clicked
//===================================================================================================================================>

function deleteTasks(index) {
  let getLocalStorage = localStorage.getItem("New Todo");
  listArr = JSON.parse(getLocalStorage);
  listArr.splice(index, 1);
  localStorage.setItem("New Todo", JSON.stringify(listArr));
  showTasks();
}

//this function deletes all the tasks in the listArr ================================================================================>

deleteAllTasks.onclick = () => {
  listArr = [];
  localStorage.setItem("New Todo", JSON.stringify(listArr));
  showTasks();
};
