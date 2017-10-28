export default db => ({
    get: (key) => {
        try {
            return Promise.resolve(db.get(key));
        } catch (e) {
            return Promise.resolve(undefined);
        }
    },
    set: (key, value = true) => {
        try {
            return Promise.resolve(db.put(key, value));
        } catch (e) {
            return Promise.resolve(undefined);
        }
    },
    push: (key, value) => {
        try {
            return Promise.resolve(db.post(key, value));
        } catch (e) {
            return Promise.resolve(undefined);
        }
    },
    delete: (keys) => {
        try {
            return Promise.resolve(keys.forEach(key => db.delete(key)));
        } catch (e) {
            return Promise.resolve(undefined);
        }
    },
});
