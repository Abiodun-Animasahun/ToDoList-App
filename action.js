// ****** select items **********

const form = document.querySelector(".input_form");
const alert = document.querySelector(".alert");
const booking = document.getElementById("booking");
const submitBtn = document.querySelector(".submit_btn");

const list = document.querySelector(".container_list");
const container = document.querySelector(".task_container");
const clearBtn = document.querySelector(".clear_btn");

// display items onload
window.addEventListener("DOMContentLoaded", setupItems);

// edit option
let editElement;
let editFlag = false;
let editID = "";

// submit form
form.addEventListener("submit", addItem);

// clear items
clearBtn.addEventListener("click", clearItems);

// ******** Event Listners *********
function addItem(e) {
  e.preventDefault();
  const value = booking.value;
  const id = new Date().getTime().toString();

  if (value && !editFlag) {
    createListItem(id, value);
    displayAlert("Tasks added to the list", "success");
    // show container
    container.classList.add("show_container");
    // add to local storage
    addToLocalStorage(id, value);
    // Set back to default
    setBackToDefault(id, value);
  } else if (value && editFlag) {
    editElement.innerHTML = value;
    displayAlert("task successfully changed", "success");
    editLocalStorage(editID, value);
    setBackToDefault();
  } else {
    displayAlert("please enter a value", "danger");
  }
}
function displayAlert(text, action) {
  alert.textContent = text;
  alert.classList.add(`alert_${action}`);

  //remove alert
  setTimeout(function () {
    alert.textContent = "";
    alert.classList.remove(`alert_${action}`);
  }, 1100);
}
//clear items
function clearItems() {
  const items = document.querySelectorAll(".task_list");
  if (items.length > 0) {
    items.forEach(function (item) {
      list.removeChild(item);
    });
  }
  container.classList.remove("show_container");
  displayAlert("empty list", "success");
  setBackToDefault();
  localStorage.removeItem("list");
}

function removeItem(e) {
  const element = e.currentTarget.parentElement.parentElement;
  const id = element.dataset.id;
  list.removeChild(element);
  if (list.children.length === 0) {
    container.classList.remove("show_container");
  }
  displayAlert("item removed", "danger");
  setBackToDefault();
  // remove from local storage
  removeFromLocalStorage(id);
}

function editItem(e) {
  const element = e.currentTarget.parentElement.parentElement;
  //set edit item
  editElement = e.currentTarget.parentElement.previousElementSibling;
  //set form value
  booking.value = editElement.innerHTML;
  editFlag = true;
  editID = element.dataset.id;
  submitBtn.textContent = "edit";
}

//********Set back to default*********/
function setBackToDefault() {
  booking.value = "";
  editFlag = false;
  editID = "";
  submitBtn.textContent = "submit";
}
//********Local Storage *******/
function addToLocalStorage(id, value) {
  const booking = { id, value };
  let items = getLocalStorage();
  console.log(items);
  items.push(booking);
  localStorage.setItem("list", JSON.stringify(items));
}
function removeFromLocalStorage(id) {
  let items = getLocalStorage();

  items = items.filter(function (item) {
    if (item.id !== id) {
      return item;
    }
  });

  localStorage.setItem("list", JSON.stringify(items));
}
function editLocalStorage(id, value) {}
function getLocalStorage() {
  return localStorage.getItem("list")
    ? JSON.parse(localStorage.getItem("list"))
    : [];
}
function editLocalStorage(id, value) {
  let items = getLocalStorage();

  items = items.map(function (item) {
    if (item.id === id) {
      item.values = value;
    }
    return item;
  });
  localStorage.setItem("list", JSON.stringify(items));
}

function setupItems() {
  let items = getLocalStorage();

  if (items.length > 0) {
    items.forEach(function (item) {
      createListItem(item.id, item.value);
    });
    container.classList.add("show_container");
  }
}

function createListItem(id, value) {
  const element = document.createElement("div");

  //add id
  const attr = document.createAttribute("data_id");
  attr.value = id;
  element.setAttributeNode(attr);
  //add class
  element.classList.add("task_list");
  element.classList.add("task_list_items");
  element.innerHTML = `

  <img src="./Ellipse.png" class="img_btn" />
        <span class="task-text">${value}</span>
        </div>
        <div class="edit_remove_btn">
        <button type="submit" class="edit_btn">Edit</button>
        <button type="submit" class="remove_btn">Remove</button>
      </div>
      </div>
      <div class="task_content">
      <h5>
        Use your phone or something<br />
        else. But dont forget
      </h5>
      <div class="message_room">
        <button class="reminder_btn">Add reminder</button>
        <ion-icon name="chatbubble-outline" class="chat_btn"></ion-icon>
      </div>
      </div>
  `;
  const removeBtn = element.querySelector(".remove_btn");
  const editBtn = element.querySelector(".edit_btn");
  //delete items
  removeBtn.addEventListener("click", removeItem);
  editBtn.addEventListener("click", editItem);
  // append child
  list.appendChild(element);
}

//local storage API
//setItem
//getItem
//removeItem
//save as string
//localStorage.setItem("babe", JSON.stringify(["item", "item2"]) );
//const babe = JSON.parse(localStorage.getItem("babe"));
//console.log(babe);
//  localStorage.removeItem("babe");

const btns = document.querySelectorAll(".img_btn");

btns.forEach(function (btn) {
  btn.addEventListener("click", function (e) {
    const question = e.currentTarget.parentElement.parentElement;
    question.classList.toggle("show-text");
  });
});
