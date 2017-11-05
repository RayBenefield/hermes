/* eslint-disable no-console */
import fs from 'fs';
import promisify from 'es6-promisify';
import request from 'request-promise-native';

const read = promisify(fs.readFile);

export default host => ({
    get: key => read('/tmp/access-token')
        .then(accessToken => request({
            method: 'GET',
            uri: `${host}/${key}.json`,
            qs: { access_token: accessToken },
            json: true,
        }))
        .then((r) => { console.log(key); return r; }),
    set: (key, value = true) => read('/tmp/access-token')
        .then(accessToken => request({
            method: 'PUT',
            uri: `${host}/${key}.json`,
            qs: { access_token: accessToken },
            json: true,
            body: value,
        }))
        .then((r) => { console.log(key); return r; }),
    delete: keys => read('/tmp/access-token')
        .then(accessToken => Promise.all(keys.map(key => request({
            method: 'DELETE',
            uri: `${host}/${key}.json`,
            qs: { access_token: accessToken },
        })
            .then((r) => { console.log(key); return r; })))),
});
