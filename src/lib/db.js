/* eslint-disable no-console */
export default db => ({
    get: (key, defaultValue) => db.ref(key).once('value')
        .then(snapshot => snapshot.val() || defaultValue)
        .then((r) => { console.log(key); return r; }),
    set: (key, value = true) => db.ref(key).set(value)
        .then((r) => { console.log(key); return r; }),
    delete: (keys, updates = {}) => {
        keys.forEach(key => updates[key] = null);
        return db.ref().update(updates)
            .then((r) => { console.log(keys); return r; });
    },
});
