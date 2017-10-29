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

test('show a hand with pickable cards', () => {
    // Given
    const lead = {
        platform: 'facebook',
        id: 123456,
    };
    flame.loadDatabase(databases['shown-goal']);

    // When
    return domain({
        lead,
        action: 'hand',
        payload: {
            game: 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa',
            round: 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa',
        },
    })
        .then(results => expect({
            results,
            db: flame.get('/'),
        }).toMatchSnapshot());
});

test('show a hand after picking a card', () => {
    // Given
    const lead = {
        platform: 'facebook',
        id: 123456,
    };
    flame.loadDatabase(databases['1-picked-card']);

    // When
    return domain({
        lead,
        action: 'hand',
        payload: {
            game: 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa',
            round: 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa',
        },
    })
        .then(results => expect({
            results,
            db: flame.get('/'),
        }).toMatchSnapshot());
});
