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

test('pick a card for the goal', () => {
    // Given
    const lead = {
        platform: 'facebook',
        id: 123456,
    };
    flame.loadDatabase(databases['shown-goal']);

    // When
    return domain({
        lead,
        action: 'pick',
        payload: {
            pick: 268,
            game: 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa',
            round: 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa',
        },
    })
        .then(save('1-picked-card'))
        .then(results => expect({
            results,
            db: flame.get('/'),
        }).toMatchSnapshot());
});

test('try to pick a card again', () => {
    // Given
    const lead = {
        platform: 'facebook',
        id: 123456,
    };
    flame.loadDatabase(databases['1-picked-card']);

    // When
    return domain({
        lead,
        action: 'pick',
        payload: {
            pick: 268,
            game: 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa',
            round: 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa',
        },
    })
        .then(results => expect({
            results,
            db: flame.get('/'),
        }).toMatchSnapshot());
});

test('second person picks a card', () => {
    // Given
    const lead = {
        platform: 'facebook',
        id: 234567,
    };
    flame.loadDatabase(databases['1-picked-card']);

    // When
    return domain({
        lead,
        action: 'pick',
        payload: {
            pick: 188,
            game: 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa',
            round: 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa',
        },
    })
        .then(save('2-picked-cards'))
        .then(results => expect({
            results,
            db: flame.get('/'),
        }).toMatchSnapshot());
});

test('third person picks a card', () => {
    // Given
    const lead = {
        platform: 'facebook',
        id: 345678,
    };
    flame.loadDatabase(databases['2-picked-cards']);

    // When
    return domain({
        lead,
        action: 'pick',
        payload: {
            pick: 175,
            game: 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa',
            round: 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa',
        },
    })
        .then(save('3-picked-cards'))
        .then(results => expect({
            results,
            db: flame.get('/'),
        }).toMatchSnapshot());
});

test('fourth person picks a card', () => {
    // Given
    const lead = {
        platform: 'facebook',
        id: 456789,
    };
    flame.loadDatabase(databases['3-picked-cards']);

    // When
    return domain({
        lead,
        action: 'pick',
        payload: {
            pick: 117,
            game: 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa',
            round: 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa',
        },
    })
        .then(save('4-picked-cards'))
        .then(results => expect({
            results,
            db: flame.get('/'),
        }).toMatchSnapshot());
});

test('the last player to pick a card', () => {
    // Given
    const lead = {
        platform: 'facebook',
        id: 567890,
    };
    flame.loadDatabase(databases['4-picked-cards']);

    // When
    return domain({
        lead,
        action: 'pick',
        payload: {
            pick: 31,
            game: 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa',
            round: 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa',
        },
    })
        .then(save('candidates-shown'))
        .then(results => expect({
            results,
            db: flame.get('/'),
        }).toMatchSnapshot());
});
