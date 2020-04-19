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
  item.innerHTML = `<div class="card card-body"><h4 class="title">Name: ${record.text}</h4> <br>Desc: ${record.desc} <button class="btn btn-danger float-right btn-sm mt-3 delete" onclick="removeTransaction(${record.id})">X</button></div>`;
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

  var tasksListAll = document.getElementsByClassName("title");
  console.log(tasksListAll);
  Array.from(tasksListAll).forEach(function (item) {
    var itemName = item.innerHTML;
    console.log(itemName);
    if (itemName.toLowerCase().indexOf(text) != -1) {
      // item.style.display = "block";
      document.getElementById("results").innerHTML = itemName;
    } else {
      document.getElementById("results").innerHTML = `No results to display!`;
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
