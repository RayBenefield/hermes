import _ from 'lodash';

export default db => ({
    get: (key, defaultValue) => db.ref(key).once('value')
        .then(snapshot => snapshot.val() || defaultValue),
    set: (key, value = true) => db.ref(key).set(value),
    getByChild: (key, property, propValue) =>
        db.ref(key).orderByChild(property).equalTo(propValue).once('value')
            .then(snapshot => _.values(snapshot.val())),
    delete: keys => db.ref().update(_.fromPairs(
        keys.map(k => ([k, null]))
    )),
});
