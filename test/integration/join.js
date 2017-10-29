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

test('player does not exist', () => {
    // Given
    const lead = {
        platform: 'facebook',
        id: 123456,
    };

    // When
    return domain({
        lead,
        action: 'join',
    })
        .then(results => expect({
            results,
            db: flame.get('/'),
        }).toMatchSnapshot());
});

test('add player to the queue', () => {
    // Given
    const lead = {
        platform: 'facebook',
        id: 123456,
    };
    flame.loadDatabase(databases['5-existing-players']);

    // When
    return domain({
        lead,
        action: 'join',
    })
        .then(save('1-player-in-queue'))
        .then(results => expect({
            results,
            db: flame.get('/'),
        }).toMatchSnapshot());
});

test('add second player to the queue', () => {
    // Given
    const lead = {
        platform: 'facebook',
        id: 234567,
    };
    flame.loadDatabase(databases['1-player-in-queue']);

    // When
    return domain({
        lead,
        action: 'join',
    })
        .then(save('2-players-in-queue'))
        .then(results => expect({
            results,
            db: flame.get('/'),
        }).toMatchSnapshot());
});

test('add third player to the queue', () => {
    // Given
    const lead = {
        platform: 'facebook',
        id: 345678,
    };
    flame.loadDatabase(databases['2-players-in-queue']);

    // When
    return domain({
        lead,
        action: 'join',
    })
        .then(save('3-players-in-queue'))
        .then(results => expect({
            results,
            db: flame.get('/'),
        }).toMatchSnapshot());
});

test('add fourth player to the queue', () => {
    // Given
    const lead = {
        platform: 'facebook',
        id: 456789,
    };
    flame.loadDatabase(databases['3-players-in-queue']);

    // When
    return domain({
        lead,
        action: 'join',
    })
        .then(save('4-players-in-queue'))
        .then(results => expect({
            results,
            db: flame.get('/'),
        }).toMatchSnapshot());
});

test('player already added to the queue', () => {
    // Given
    const lead = {
        platform: 'facebook',
        id: 123456,
    };
    flame.loadDatabase(databases['player-in-queue']);

    // When
    return domain({
        lead,
        action: 'join',
    })
        .then(results => expect({
            results,
            db: flame.get('/'),
        }).toMatchSnapshot());
});

test('new game started from full queue', () => {
    // Given
    const lead = {
        platform: 'facebook',
        id: 567890,
    };
    flame.loadDatabase(databases['4-players-in-queue']);

    // When
    return domain({
        lead,
        action: 'join',
    })
        .then(save('new-game'))
        .then(results => expect({
            results,
            db: flame.get('/'),
        }).toMatchSnapshot());
});
