
document.addEventListener("DOMContentLoaded", function () {
    const taskForm = document.getElementById("taskForm");
    const taskList = document.getElementById("taskList");
    const filterCompleted = document.getElementById("filterCompleted");
    const filterButton = document.getElementById("filterButton");

    taskForm.addEventListener("submit", function (event) {
        event.preventDefault();
        addTask();
    });

    function addTask() {
        const title = document.getElementById("taskTitle").value.trim();
        const description = document.getElementById("taskDescription").value.trim();
        const priority = document.querySelector("input[name='priority']:checked");


        if (!title || !priority) {
            alert("Başlık ve öncelik seçimi zorunludur!");
            return;
        }


        const taskItem = document.createElement("li");
        taskItem.classList.add("task-item");

        let priorityClass = "";
        if (priority.value === "High Priority") {
            priorityClass = "priority-high";
        } else if (priority.value === "Medium Priority") {
            priorityClass = "priority-medium";
        } else {
            priorityClass = "priority-low";
        }
        taskItem.innerHTML = `
            <span><strong>${title}</strong></span>
            <span>${description}</span>
            <span class="${priorityClass}">${priority.value}</span>
            <button class="complete-btn">Complete</button>
            <button class="delete-btn">Delete</button>
        `;

        taskList.appendChild(taskItem);
        if (filterCompleted.checked) {
            taskItem.style.display = "none";
        } else {
            taskItem.style.display = "block";
        }
        document.getElementById("taskForm").reset();
    }



    taskList.addEventListener("click", function (event) {
        if (event.target.classList.contains("complete-btn")) {
            event.target.parentElement.classList.toggle("completed");
            event.target.parentElement.style.backgroundColor = event.target.parentElement.classList.contains("completed") ? "lightgreen" : "white";
            //change button text
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
        //change button text
        filterButton.textContent = filterCompleted.checked ? "Filter Uncompleted" : "Filter Completed";
    });

});

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

