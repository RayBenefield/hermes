import fs from 'fs';
import path from 'path';
import promisify from 'es6-promisify';
import transmute from 'transmutation';
import cards from './data/raw-cah.json';

const write = promisify(fs.writeFile);
transmute({
    raw: cards,
})
    .extend('white', ({ raw }) => raw
        .filter(c => c.cardType === 'A')
        .map((c, id) => ({
            id,
            contents: c.text,
        })))
    .extend('black', ({ raw }) => raw
        .filter(c => c.cardType === 'Q')
        .map((c, id) => ({
            id,
            contents: c.text,
        })))
    .do(({ white, black }) => Promise.all([
        write(path.resolve(__dirname, '../src/data/white-deck.json'), JSON.stringify(white, null, 4)),
        write(path.resolve(__dirname, '../src/data/black-deck.json'), JSON.stringify(black, null, 4)),
    ]))
    .then(() => process.exit(0));
