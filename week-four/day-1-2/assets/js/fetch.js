import { cacheData, cachedData } from "./cache.js";


export const fetchUsers = ({ url, onData, onCacheData, onError, onPending }) => {

    onPending(true);

    setTimeout(() => {
        const STORAGE_KEY = "usersData";
        const cachedUsers = cachedData(STORAGE_KEY);
        
        if (cachedUsers) {
            onCacheData(cachedUsers);
            onPending(false);
        } else {
            fetch(url)
                .then(response => {
                    if (!response.ok) {
                        throw new Error(`HTTP Error: ${response.status}`);
                    }
                    return response.json();
                })
                .then(data => {
                    const cachedUsers = cacheData(STORAGE_KEY, data);
                    onData(cachedUsers);
                })
                .catch(error => {
                    onError(error);
                })
                .finally(() => onPending(false));
        }
    }, 2000);
};
