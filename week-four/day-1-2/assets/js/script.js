import { fetchUsers } from "./fetch.js";
import { removeCachedUser } from "./cache.js";



document.addEventListener("DOMContentLoaded", () => {

    const usersContainer = document.getElementById("ins-api-users");
    const API_URL = "https://jsonplaceholder.typicode.com/users";
    const STORAGE_KEY = "usersData";

    const addUser = (data) => {
        usersContainer.innerHTML += `
        <div class="ins-api-user" data-id="${data.id}">
            <div class="body">
                <div class="body-header">
                    <span class="name">Name: ${data.name}</span>
                    <span class="email">Email: ${data.email}</span>
                    <p class="address">Address: ${data.address.street} ${data.address.suite} ${data.address.city}</p>
                </div>
                <button class="remove-btn">Remove</button>
            </div>
        </div>`;
    };

    fetchUsers({
        url: API_URL,
        onPending: (pending) => {
            if (pending) {
                usersContainer.innerHTML = `<div class="loader-container"><div class="loader"></div></div>`;
                console.log("Yükleniyor:", pending);
            }

        },
        onData: (users) => {
            usersContainer.innerHTML = "";
            users.forEach(user => addUser(user));
        },
        onCacheData: (users) => {
            usersContainer.innerHTML = "";
            users.forEach(user => addUser(user));
        },
        onError: (error) => {
            if (error) {
                usersContainer.innerHTML = `<p>${error.message}</p>`;
                console.error("Hata:", error);
            }

        }
    });


    document.addEventListener("click", ({ target }) => {
        if (target.classList.contains("remove-btn")) {
            const userElement = target.closest(".ins-api-user");
            const userId = userElement.dataset.id;

            console.log(`Kaldırılan Kullanıcı ID: ${userId}`);

            userElement.remove();

            removeCachedUser(STORAGE_KEY, userId);
        }
    });
});
