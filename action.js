// ****** select items **********

const form = document.querySelector(".input_form");
const alert = document.querySelector(".alert");
const booking = document.getElementById("booking");
const submitBtn = document.querySelector(".submit_btn");
const editBtn = document.querySelector(".edit_btn");
const removeBtn = document.querySelector(".remove_btn");
const list = document.querySelector(".container_list");
const container = document.querySelector(".task_container");
const clearBtn = document.querySelector(".clear_btn");

// edit option
let editElement;
let editFlag = false;
let editID = "";

// submit form
form.addEventListener("submit", addItem);

// clear items
clearBtn.addEventListener("click", clearItems);

//delete items
removeBtn.addEventListener("click", removeItem);
console.log("removeBtn");
// ******** Event Listners *********
function addItem(e) {
  e.preventDefault();
  const value = booking.value;
  const id = new Date().getTime().toString();

  if (value && !editFlag) {
    const element = document.createElement("div");

    //add id
    const attr = document.createAttribute("data_id");
    attr.value = id;
    element.setAttributeNode(attr);
    //add class
    element.classList.add("task_list");
    element.innerHTML = `
    <img src="./Ellipse.png" class="img_btn" />
          <span class="task-text">${value}</span>
        </div>
      
        <div class="edit_remove_btn">
        <div class="task_content">
          <h5>
            Use your phone or something<br />
            else. But dont forget
          </h5>
          <div class="message_room">
            <button class="reminder_btn">Add reminder</button>
            <ion-icon name="chatbubble-outline" class="chat_btn"></ion-icon>
          </div>
    `;
    list.appendChild(element);
    displayAlert("Tasks added to the list", "success");
    // show container
    container.classList.add("show_container");
    // add to local storage
    addToLocalStorage(id, value);
    // Set back to default
    setBackToDefault(id, value);
  } else if (value && editFlag) {
    console.log("editing");
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
  // localStorage.romoveItems('list')
}

function removeItem() {
  const items = document.querySelectorAll(".task_list");
  if (items.length > 0) {
    items.forEach(function (item) {
      list.removeChild(item);
    });
  }
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
  console.log("add to local storage");
}

const btns = document.querySelectorAll(".img_btn");

btns.forEach(function (btn) {
  btn.addEventListener("click", function (e) {
    const question = e.currentTarget.parentElement.parentElement;
    question.classList.toggle("show-text");
  });
});
