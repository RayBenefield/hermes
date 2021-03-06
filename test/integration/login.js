import flame from '@leonardvandriel/flame';
import * as databases from './database'; // eslint-disable-line import/no-unresolved,import/extensions
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

test('sends back a welcome message and instructions message', () => {
    // Given
    const lead = {
        platform: 'facebook',
        id: 123456,
        first_name: 'Ray',
    };

    // When
    return domain({
        lead,
        action: 'login',
    })
        .then(save('existing-player'))
        .then(results => expect({
            results,
            db: flame.get('/'),
        }).toMatchSnapshot());
});

test('sends back a welcome message to second player and instructions message', () => {
    // Given
    const lead = {
        platform: 'facebook',
        id: 234567,
        first_name: 'Hermon',
    };
    flame.loadDatabase(databases['existing-player']);

    // When
    return domain({
        lead,
        action: 'login',
    })
        .then(save('2-existing-players'))
        .then(results => expect({
            results,
            db: flame.get('/'),
        }).toMatchSnapshot());
});

test('sends back a welcome message to third player and instructions message', () => {
    // Given
    const lead = {
        platform: 'facebook',
        id: 345678,
        first_name: 'Hermes',
    };
    flame.loadDatabase(databases['2-existing-players']);

    // When
    return domain({
        lead,
        action: 'login',
    })
        .then(save('3-existing-players'))
        .then(results => expect({
            results,
            db: flame.get('/'),
        }).toMatchSnapshot());
});

test('sends back a welcome message to fourth player and instructions message', () => {
    // Given
    const lead = {
        platform: 'facebook',
        id: 456789,
        first_name: 'Hermshire',
    };
    flame.loadDatabase(databases['3-existing-players']);

    // When
    return domain({
        lead,
        action: 'login',
    })
        .then(save('4-existing-players'))
        .then(results => expect({
            results,
            db: flame.get('/'),
        }).toMatchSnapshot());
});

test('sends back a welcome message to fifth player and instructions message', () => {
    // Given
    const lead = {
        platform: 'facebook',
        id: 567890,
        first_name: 'Hermda',
    };
    flame.loadDatabase(databases['4-existing-players']);

    // When
    return domain({
        lead,
        action: 'login',
    })
        .then(save('5-existing-players'))
        .then(results => expect({
            results,
            db: flame.get('/'),
        }).toMatchSnapshot());
});

test('welcomes back a player', () => {
    // Given
    const lead = {
        platform: 'facebook',
        id: 123456,
    };
    flame.loadDatabase(databases['existing-player']);

    // When
    return domain({
        lead,
        action: 'login',
    })
        .then(results => expect({
            results,
            db: flame.get('/'),
        }).toMatchSnapshot());
});
