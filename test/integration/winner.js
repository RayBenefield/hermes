import flame from '@leonardvandriel/flame';
import * as databases from './database'; // eslint-disable-line import/no-unresolved,import/extensions,no-unused-vars
import uuid from '../utils/mock-uuid';
import random from '../utils/mock-random';
import configureSave from '../utils/save-db';
import configureDomain from '../../src/domain';
import configureFlame from '../../src/lib/local-db';

const db = configureFlame(flame);
const domain = configureDomain({ db, uuid, random });
const save = configureSave(flame); // eslint-disable-line no-unused-vars
beforeEach(() => flame.loadDatabase(undefined));

test('notify all players of the winner and the new round', () => {
    // Given
    flame.loadDatabase(databases['winner-decided']);
    uuid(); // Needed to trigger the next random generation for the new round

    // When
    return domain({
        action: 'winner',
        payload: {
            game: '0-05526803409810505',
            round: '0-05526803409810505',
            winner: 175,
        },
    })
        .then(save('winner-then-new-round'))
        .then(results => expect({
            results,
            db: flame.get('/'),
        }).toMatchSnapshot());
});
