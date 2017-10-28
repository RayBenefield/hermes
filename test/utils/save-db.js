import fs from 'fs';
import path from 'path';
import promisify from 'es6-promisify';

const write = promisify(fs.writeFile);

export default db => dbName => (results) => {
    const data = db.get('/');
    return write(
        path.resolve(__dirname, `../integration/database/${dbName}.json`),
        JSON.stringify(data || {}, null, 4)
    ).then(() => results);
};
