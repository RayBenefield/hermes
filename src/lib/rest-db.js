/* eslint-disable no-console, max-lines */
import google from 'googleapis';
import promisify from 'es6-promisify';
import request from 'request-promise-native';

export default ({ host, private_key: privateKey, client_email: email }) => {
    let accessToken;
    // Authenticate a JWT client with the service account.
    const jwtClient = new google.auth.JWT(
        email,
        null,
        privateKey.replace(/\\n/g, '\n'),
        ['https://www.googleapis.com/auth/userinfo.email', 'https://www.googleapis.com/auth/firebase.database']
    );

    // Use the JWT client to generate an access token.
    const authorize = promisify(jwtClient.authorize, jwtClient);

    const getToken = () => {
        if (accessToken) return Promise.resolve(accessToken);
        return authorize()
            .then(({ access_token: token }) => {
                if (token === null) {
                    throw new Error('Provided service account does not have permission to generate access tokens');
                }
                accessToken = token;
            })
            // eslint-disable-next-line no-console
            .catch(error => console.log('Error making request to generate access token:', error));
    };
    return {
        get: key => getToken()
            .then(() => request({
                method: 'GET',
                uri: `${host}/${key}.json`,
                qs: { access_token: accessToken },
                json: true,
            }))
            .then((r) => { console.log(key); return r; }),
        set: (key, value = true) => getToken()
            .then(() => request({
                method: 'PUT',
                uri: `${host}/${key}.json`,
                qs: { access_token: accessToken },
                json: true,
                body: value,
            }))
            .then((r) => { console.log(key); return r; }),
        delete: keys => getToken()
            .then(() => Promise.all(keys.map(key => request({
                method: 'DELETE',
                uri: `${host}/${key}.json`,
                qs: { access_token: accessToken },
            })
                .then((r) => { console.log(key); return r; })))),
    };
};
