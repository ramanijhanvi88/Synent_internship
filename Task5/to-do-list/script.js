// ================= LOAD TASKS =================

window.onload = function () {

    loadTasks();

};

// ================= ADD TASK =================

function addTask() {

    // GET INPUT

    const taskInput = document.getElementById("taskInput");

    const taskText = taskInput.value.trim();

    // EMPTY CHECK

    if (taskText === "") {

        alert("Please enter a task!");

        return;
    }

    // CREATE TASK

    createTask(taskText, false);

    // SAVE TASK

    saveTask(taskText, false);

    // CLEAR INPUT

    taskInput.value = "";
}

// ================= CREATE TASK =================

function createTask(taskText, completed) {

    const taskList = document.getElementById("taskList");

    // CREATE LI

    const li = document.createElement("li");

    li.classList.add("task");

    // TASK TEXT

    const span = document.createElement("span");

    span.innerText = taskText;

    // COMPLETED CLASS

    if (completed) {

        span.classList.add("completed");
    }

    // ================= BUTTON CONTAINER =================

    const buttonContainer = document.createElement("div");

    buttonContainer.classList.add("btn-container");

    // ================= DONE BUTTON =================

    const doneBtn = document.createElement("button");

    doneBtn.innerText = "Done";

    doneBtn.classList.add("done-btn");

    // DONE BUTTON CLICK

    doneBtn.onclick = function () {

        span.classList.toggle("completed");

        updateLocalStorage();
    };

    // ================= REMOVE BUTTON =================

    const removeBtn = document.createElement("button");

    removeBtn.innerText = "Remove";

    removeBtn.classList.add("remove-btn");

    // REMOVE TASK

    removeBtn.onclick = function () {

        li.remove();

        updateLocalStorage();
    };

    // APPEND BUTTONS

    buttonContainer.appendChild(doneBtn);

    buttonContainer.appendChild(removeBtn);

    // APPEND ALL

    li.appendChild(span);

    li.appendChild(buttonContainer);

    taskList.appendChild(li);
}

// ================= SAVE TASK =================

function saveTask(taskText, completed) {

    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    tasks.push({

        text: taskText,

        completed: completed
    });

    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// ================= UPDATE STORAGE =================

function updateLocalStorage() {

    const tasks = [];

    document.querySelectorAll(".task").forEach(task => {

        const text = task.querySelector("span").innerText;

        const completed = task.querySelector("span")
            .classList.contains("completed");

        tasks.push({

            text: text,

            completed: completed
        });

    });

    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// ================= LOAD TASKS =================

function loadTasks() {

    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    tasks.forEach(task => {

        createTask(task.text, task.completed);

    });
}