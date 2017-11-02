import flame from '@leonardvandriel/flame';
import * as databases from './database'; // eslint-disable-line import/no-unresolved,import/extensions,no-unused-vars
import uuid from '../utils/mock-uuid';
import delay from '../utils/mock-delay';
import random from '../utils/mock-random';
import configureSave from '../utils/save-db';
import configureDomain from '../../src/domain';
import configureFlame from '../../src/lib/local-db';

const db = configureFlame(flame);
const domain = configureDomain({ db, uuid, random, delay });
const save = configureSave(flame); // eslint-disable-line no-unused-vars
beforeEach(() => flame.loadDatabase(undefined));

test.only('notify all players of vote starting', () => {
    // Given
    flame.loadDatabase(databases['candidates-shown']);

    // When
    return domain({
        action: 'candidates',
        payload: {
            game: '0-05526803409810505',
            round: '0-05526803409810505',
            notified: { 567890: true },
        },
    })
        .then(save('vote-started'))
        .then(results => expect({
            results,
            db: flame.get('/'),
        }).toMatchSnapshot());
});
