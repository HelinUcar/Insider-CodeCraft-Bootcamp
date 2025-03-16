export const cacheData = (key,data, expiryInMinutes = 1440) => {
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

export const cachedData = (key) => {
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


export const removeCachedUser = (key, userId) => {
    try {
        const users = cachedData(key);
        if (!users) return;

        const updatedUsers = users.filter(user => user.id !== parseInt(userId));
        cacheData(key, updatedUsers);
    } catch (e) {
        console.error("Cache'den kullanıcı silinemedi:", e);
    }
};
