export default db => ({
    get: (key, defaultValue) => db.ref(key).once('value')
        .then(snapshot => snapshot.val() || defaultValue),
    set: (key, value = true) => db.ref(key).set(value),
    push: (key, value) => db.ref(key).push(value),
    delete: (keys, updates = {}) => {
        keys.forEach(key => updates[key] = null);
        return db.ref().update(updates);
    },
});
