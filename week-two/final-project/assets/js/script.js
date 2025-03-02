document.addEventListener("DOMContentLoaded", function () {
    const taskForm = document.getElementById("taskForm");
    const taskList = document.getElementById("taskList");
    const filterCompleted = document.getElementById("filterCompleted");
    const filterButton = document.getElementById("filterButton");
    const sortPriority = document.getElementById("sortPriority");

    taskForm.addEventListener("submit", function (event) {
        event.preventDefault();
        addTask();
    });

    function addTask() {
        try {
            const titleInput = document.getElementById("taskTitle");
            const descriptionInput = document.getElementById("taskDescription");
            const priorityInput = document.querySelector("input[name='priority']:checked");

            if (!titleInput || !descriptionInput || !taskList) {
                throw new Error("Necessary HTML requirements are missing!");
            }

            const title = titleInput.value.trim();
            const description = descriptionInput.value.trim(); 
            if (!title) {
                alert("Please enter a task title!");
                titleInput.focus();
                return;
            }

            if (!priorityInput) {
                alert("Please select a priority!");
                return;
            }

            const priority = priorityInput.value.trim();

            const taskItem = document.createElement("li");
            taskItem.classList.add("task-item");
            taskItem.setAttribute("data-priority", priority); 

            let priorityClass = "";
            if (priority === "High Priority") {
                priorityClass = "priority-high";
            } else if (priority === "Medium Priority") {
                priorityClass = "priority-medium";
            } else {
                priorityClass = "priority-low";
            }

            taskItem.innerHTML = `
                <span><strong>${title}</strong></span>
                <span>${description}</span>
                <span class="${priorityClass}">${priority}</span>
                <button class="complete-btn">Complete</button>
                <button class="delete-btn">Delete</button>
            `;

            taskList.appendChild(taskItem);

            if (filterCompleted && filterCompleted.checked) {
                taskItem.style.display = "none";
            } else {
                taskItem.style.display = "block";
            }


            if (sortPriority.checked) {
                sortTasks();
            }

            document.getElementById("taskForm").reset();
        } catch (error) {
            console.error("Error occurred:", error);
            alert("An error occurred while adding the task! Please try again.");
        }
    }

    taskList.addEventListener("click", function (event) {
        event.stopPropagation();
    
        if (event.target.classList.contains("complete-btn")) {
            event.target.parentElement.classList.toggle("completed");
            event.target.parentElement.style.backgroundColor = event.target.parentElement.classList.contains("completed") ? "lightgreen" : "white";
            event.target.textContent = event.target.parentElement.classList.contains("completed") ? "Uncomplete" : "Complete";
        }
        if (event.target.classList.contains("delete-btn")) {
            event.target.parentElement.remove();
        }
    });

    filterCompleted.addEventListener("click", function () {
        document.querySelectorAll(".task-item").forEach(task => {
            if (!task.classList.contains("completed")) {
                task.style.display = filterCompleted.checked ? "none" : "block";
            }
        });

        filterButton.textContent = filterCompleted.checked ? "Filter Uncompleted" : "Filter Completed";
    });

    sortPriority.addEventListener("click", function () {
        sortTasks();
    });

    function sortTasks() {
        const tasks = Array.from(taskList.children);

        tasks.sort((a, b) => {
            const priorityOrder = { "High Priority": 1, "Medium Priority": 2, "Low Priority": 3 };
            return sortPriority.checked 
                ? priorityOrder[a.getAttribute("data-priority")] - priorityOrder[b.getAttribute("data-priority")] 
                : 0;
        });

        taskList.innerHTML = "";
        tasks.forEach(task => taskList.appendChild(task));
    }

    function updateClock() {
        const now = new Date();
        const days = ["SU", "MO", "TU", "WE", "TH", "FR", "SA"];
        document.getElementById('day').textContent = days[now.getDay()];
        document.getElementById('hours').textContent = String(now.getHours()).padStart(2, '0');
        document.getElementById('minutes').textContent = String(now.getMinutes()).padStart(2, '0');
        document.getElementById('seconds').textContent = String(now.getSeconds()).padStart(2, '0');
    }

    setInterval(updateClock, 1000);
    updateClock();
});
