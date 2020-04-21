const results = document.getElementById("results");
const taskName = document.getElementById("taskname");
const desc = document.getElementById("description");
const addForm = document.getElementById("main-form");
const search = document.getElementById("search");

const localStorageTransactions = JSON.parse(
  localStorage.getItem("transactions")
);

let transactions =
  localStorage.getItem("transactions") !== null ? localStorageTransactions : [];

function addTask(e) {
  e.preventDefault();

  if (taskName.value.trim() === "" || desc.value.trim() === "") {
    alert("Please enter name and description both!");
  } else {
    const record = {
      id: generateID(),
      text: taskName.value,
      desc: desc.value,
    };
    transactions.push(record);
    console.log(transactions);
    fetchRecords(record);
    updateLocalStorage();
    taskName.value = "";
    desc.value = "";
  }
}

function generateID() {
  return Math.floor(Math.random() * 100000000);
}

function fetchRecords(record) {
  var item = document.createElement("div");
  item.classList.add("task");
  item.innerHTML = `<div class="card card-body"><h4 class="title-head" id="title">${record.text}</h4> <br><p class="body">Desc: ${record.desc} </p><button class="btn btn-danger float-right btn-sm mt-3 delete" onclick="removeTransaction(${record.id})">X</button></div>`;
  results.appendChild(item);
}

function updateLocalStorage() {
  localStorage.setItem("transactions", JSON.stringify(transactions));
}

function removeTransaction(id) {
  transactions = transactions.filter((transaction) => transaction.id !== id);

  updateLocalStorage();
  init();
}

function searchTasks(e) {
  var text = e.target.value.toLowerCase();
  console.log(text);
  var tasksListAll = document.querySelectorAll(".task");
  console.log(tasksListAll);
  Array.from(tasksListAll).forEach(function (item) {
    const title = item.querySelector(".title-head").innerText.toLowerCase();
    const body = item.querySelector(".body").innerText.toLowerCase();
    console.log(title, body);
    if (title.indexOf(text) != -1 || body.indexOf(text) != -1) {
      item.style.display = "flex";
    } else {
      item.style.display = "none";
    }
  });
}

function init() {
  results.innerHTML = "";
  transactions.forEach(fetchRecords);
  console.log("init");
}

init();
addForm.addEventListener("submit", addTask);
search.addEventListener("keyup", searchTasks);
