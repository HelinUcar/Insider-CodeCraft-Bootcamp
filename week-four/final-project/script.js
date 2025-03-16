(() => {
    const appendLocation = "#user-list";
    const API_URL = "https://jsonplaceholder.typicode.com/users";
    const STORAGE_KEY = "usersData";
    const SESSION_KEY = "reloadButtonUsed";

    const init = async () => {
        await loadJQuery();
        buildCss();
        buildHtml();
        fetchUsers();
        setEvents();
        observeUserList();
    }

    const loadJQuery = async () => {
        const startTime = performance.now();
        await new Promise((resolve, reject) => {
            if (window.jQuery) {
                return resolve();
            }
            const script = document.createElement('script');
            script.src = `https://code.jquery.com/jquery-3.7.1.min.js?cacheBust=${Date.now()}`; // Önbelleği önlemek için
            script.type = 'text/javascript';

            script.onload = () => resolve();
            script.onerror = () => reject(new Error('jQuery yüklenemedi!')); // Hata durumunda reddedilir

            document.head.appendChild(script);
        });

        const endTime = performance.now();
        console.log(`jQuery ${(endTime - startTime).toFixed(2)} ms'de yüklendi.`);
    };

    const cacheData = (key, data, expiryInMinutes = 1440) => {
        try {
            const expiryTimestamp = Date.now() + expiryInMinutes * 60 * 1000;

            const cacheObject = {
                data,
                expiry: expiryTimestamp
            };

            localStorage.setItem(key, JSON.stringify(cacheObject));
            return data;
        } catch (e) {
            console.error("Cache kaydedilemedi:", e);
            return data;
        }
    };

    const cachedData = (key) => {
        try {
            const cacheString = localStorage.getItem(key);
            if (!cacheString) return null;

            const { data, expiry } = JSON.parse(cacheString);

            if (Date.now() > expiry) {
                localStorage.removeItem(key);
                return null;
            }

            return data;
        } catch (e) {
            console.error("Cache okunamadı:", e);
            return null;
        }
    };

    const removeCachedUser = (key, userId) => {
        try {
            const users = cachedData(key);
            if (!users) return;

            const updatedUsers = users.filter(user => user.id !== parseInt(userId));
            cacheData(STORAGE_KEY, updatedUsers);
        } catch (e) {
            console.error("Cache'den kullanıcı silinemedi:", e);
        }
    };

    const onPending = (pending) => {
        if (pending) {
            $(appendLocation).html(`<div class="loader-container"><div class="loader"></div></div>`);
            console.log("Yükleniyor:", pending);
        }
    };

    const onError = (error) => {
        if (error) {
            $(appendLocation).html(`<p>${error.message}</p>`);
            console.error("Hata:", error);
        }
    };

    const fetchUsers = () => {
        onPending(true);
        setTimeout(() => {
            const cachedUsers = cachedData(STORAGE_KEY);
            if (cachedUsers) {
                $(appendLocation).html("");
                renderUsers(cachedUsers);
                onPending(false);
            } else {
                fetch(API_URL)
                    .then(response => {
                        if (!response.ok) {
                            throw new Error(`HTTP Error: ${response.status}`);
                        }
                        return response.json();
                    })
                    .then(data => {
                        const cachedUsers = cacheData(STORAGE_KEY, data);
                        $(appendLocation).html("");
                        renderUsers(cachedUsers);
                    })
                    .catch(error => {
                        onError(error);
                    })
                    .finally(() => onPending(false));
            }
        }, 2000);
    };



    const buildHtml = () => {
        if ($(appendLocation).length) return;
        $("body").append(`
            <h1>Kullanıcı Listesi</h1>
            <button id="reload-users" style="display: none;">Kullanıcıları Yeniden Yükle</button>
            <div id="${appendLocation.substring(1)}"></div>
        `);

    };

    const buildCss = () => {
        if ($("style").length) return;
        const css = `
            @import url("https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700&display=swap");
            body {
              font-family: "Montserrat", sans-serif;
              background-color: #f4f4f4;
              margin: 0;
              padding: 20px;
            }

            .container {
                max-width: 900px;
                width: 100%;
                background: white;
                padding: 20px;
                box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.1);
                border-radius: 12px;
                overflow: hidden;
            }

            h1 {
                text-align: center;
                color: #333;
                margin-bottom: 20px;
                font-weight: 600;
            }
            #reload-users {
                position: relative;
                margin-top: 20px;
                padding: 10px 20px;
                background-color: #007BFF;
                color: #fff;
                border: none;
                border-radius: 5px;
                font-size: 16px;
                cursor: pointer;
                transition: background-color 0.3s ease;
            }

            #reload-users:hover {
                background-color: #0056b3;
            }

            #reload-users[title]:hover::after {
                content: attr(title);
                position: absolute;
                top: -100%;
                left: 0;
                color: #fff;
                background-color: #ff4b5c;
                border-radius: 5px;
            }
            

            ${appendLocation} {
                display: flex;
                flex-wrap: wrap;
                gap: 15px;
                justify-content: center;
                padding: 10px;
            }


            .api-user {
                background: #fff;
                border-radius: 12px;
                box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
                overflow: hidden;
                text-align: center;
                transition: 0.3s ease-in-out;
                width: 250px; /* Sabit genişlik */
                display: flex;
                flex-direction: column;
                align-items: center;
            }

            .api-user:hover {
                transform: translateY(-5px);
                box-shadow: 0px 8px 20px rgba(0, 0, 0, 0.15);
            }



            .api-user .body {
                padding: 15px;
                display: flex;
                flex-direction: column;
                align-items: center;
            }

            .body-header {
                text-align: center;
            }

            .body-header .name {
                font-size: 16px;
                font-weight: 600;
                color: #333;
            }

            .body-header .email {
                font-size: 14px;
                color: #666;
            }

            .body-header .address {
                font-size: 12px;
                color: #999;
            }


            .remove-btn {
                background: #ff4b5c;
                color: white;
                border: none;
                padding: 8px 15px;
                border-radius: 8px;
                cursor: pointer;
                font-size: 14px;
                transition: 0.3s;
                margin-top: 10px;
            }

            .remove-btn:hover {
                background: #e63946;
            }

            #loader-container {
                display: none;
                justify-content: center;
                align-items: center;
            }

            .loader {
                width: 35px;
                aspect-ratio: 1;
                border-radius: 50%;
                border: 5px solid;
                border-color: #000 #0000;
                animation: l1 1s infinite;
            }
            @keyframes l1 {
                to {
                    transform: rotate(0.5turn);
                }
            }

        `;

        const style = document.createElement("style");
        style.textContent = css;
        style.classList.add("our-style");
        document.head.appendChild(style);
    };



    const renderUsers = (users) => {
        $(appendLocation).html(users.map(user => `
            <div class="api-user" data-id="${user.id}">
                <div class="body">
                    <div class="body-header">
                        <span class="name">${user.name}</span>
                        <span class="email">${user.email}</span>
                        <p class="address">${user.address.street} ${user.address.suite} ${user.address.city}</p>
                    </div>
                    <button class="remove-btn">Sil</button>
                </div>
            </div>
        `).join(""));
    };

    const setEvents = () => {
        $(document).on("click", ".remove-btn", function () {
            const userElement = $(this).closest(".api-user");
            const userId = userElement.data("id");
            userElement.remove();
            removeCachedUser(STORAGE_KEY, userId);
        });

        $(document).on("click", "#reload-users", function () {
            if (!sessionStorage.getItem(SESSION_KEY)) {
                sessionStorage.setItem(SESSION_KEY, "true");
                localStorage.removeItem(STORAGE_KEY);
                fetchUsers();
                $(this).attr("title", "Bu oturumda buton tekrar kullanılamaz.");
                $(this).prop("disabled", true);
            }
        });
    };

    const observeUserList = () => {
        const observer = new MutationObserver(() => {
            if ($(appendLocation).children(".api-user").length === 0) {
                const button = $("#reload-users");
                if (!sessionStorage.getItem(SESSION_KEY)) {
                    button.show();
                } else {
                    button.show();
                    button.attr("title", "Bu oturumda buton tekrar kullanılamaz.");
                    button.prop("disabled", true);
                }
            } else {
                $("#reload-users").hide();
            }
        });
        observer.observe($(appendLocation)[0], { childList: true });
    };

    init();
})();

