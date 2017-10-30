import flame from '@leonardvandriel/flame';
import * as databases from './database'; // eslint-disable-line import/no-unresolved,import/extensions,no-unused-vars
import uuid from '../utils/mock-uuid';
import random from '../utils/mock-random';
import configureSave from '../utils/save-db';
import configureDomain from '../../src/domain';
import configureFlame from '../../src/lib/local-db';

const db = configureFlame(flame);
const domain = configureDomain({ db, uuid, random: random() });
const save = configureSave(flame); // eslint-disable-line no-unused-vars
beforeEach(() => flame.loadDatabase(undefined));

test('1st player votes for first card', () => {
    // Given
    const lead = {
        platform: 'facebook',
        id: 123456,
    };
    flame.loadDatabase(databases['candidates-shown']);

    // When
    return domain({
        lead,
        action: 'vote',
        payload: {
            vote: 175,
            game: 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa',
            round: 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa',
        },
    })
        .then(save('1-vote-1-player-card'))
        .then(results => expect({
            results,
            db: flame.get('/'),
        }).toMatchSnapshot());
});

test('1st player votes for second card', () => {
    // Given
    const lead = {
        platform: 'facebook',
        id: 123456,
    };
    flame.loadDatabase(databases['1-vote-1-player-card']);

    // When
    return domain({
        lead,
        action: 'vote',
        payload: {
            vote: 117,
            game: 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa',
            round: 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa',
        },
    })
        .then(save('2-votes-1-player-card'))
        .then(results => expect({
            results,
            db: flame.get('/'),
        }).toMatchSnapshot());
});

test('1st player votes for third card', () => {
    // Given
    const lead = {
        platform: 'facebook',
        id: 123456,
    };
    flame.loadDatabase(databases['2-votes-1-player-card']);

    // When
    return domain({
        lead,
        action: 'vote',
        payload: {
            vote: 31,
            game: 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa',
            round: 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa',
        },
    })
        .then(save('3-votes-1-player-card'))
        .then(results => expect({
            results,
            db: flame.get('/'),
        }).toMatchSnapshot());
});

test('2nd player votes for first card', () => {
    // Given
    const lead = {
        platform: 'facebook',
        id: 234567,
    };
    flame.loadDatabase(databases['3-votes-1-player-card']);

    // When
    return domain({
        lead,
        action: 'vote',
        payload: {
            vote: 175,
            game: 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa',
            round: 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa',
        },
    })
        .then(save('4-votes-2-players-card'))
        .then(results => expect({
            results,
            db: flame.get('/'),
        }).toMatchSnapshot());
});

test('2nd player votes for second card', () => {
    // Given
    const lead = {
        platform: 'facebook',
        id: 234567,
    };
    flame.loadDatabase(databases['4-votes-2-players-card']);

    // When
    return domain({
        lead,
        action: 'vote',
        payload: {
            vote: 117,
            game: 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa',
            round: 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa',
        },
    })
        .then(save('5-votes-2-players-card'))
        .then(results => expect({
            results,
            db: flame.get('/'),
        }).toMatchSnapshot());
});

test('2nd player votes for third card', () => {
    // Given
    const lead = {
        platform: 'facebook',
        id: 234567,
    };
    flame.loadDatabase(databases['5-votes-2-players-card']);

    // When
    return domain({
        lead,
        action: 'vote',
        payload: {
            vote: 31,
            game: 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa',
            round: 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa',
        },
    })
        .then(save('6-votes-2-players-card'))
        .then(results => expect({
            results,
            db: flame.get('/'),
        }).toMatchSnapshot());
});

test('3rd player votes for first card', () => {
    // Given
    const lead = {
        platform: 'facebook',
        id: 345678,
    };
    flame.loadDatabase(databases['6-votes-2-players-card']);

    // When
    return domain({
        lead,
        action: 'vote',
        payload: {
            vote: 268,
            game: 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa',
            round: 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa',
        },
    })
        .then(save('7-votes-3-players-card'))
        .then(results => expect({
            results,
            db: flame.get('/'),
        }).toMatchSnapshot());
});

test('3rd player votes for second card', () => {
    // Given
    const lead = {
        platform: 'facebook',
        id: 345678,
    };
    flame.loadDatabase(databases['7-votes-3-players-card']);

    // When
    return domain({
        lead,
        action: 'vote',
        payload: {
            vote: 117,
            game: 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa',
            round: 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa',
        },
    })
        .then(save('8-votes-3-players-card'))
        .then(results => expect({
            results,
            db: flame.get('/'),
        }).toMatchSnapshot());
});

test('3rd player votes for third card', () => {
    // Given
    const lead = {
        platform: 'facebook',
        id: 345678,
    };
    flame.loadDatabase(databases['8-votes-3-players-card']);

    // When
    return domain({
        lead,
        action: 'vote',
        payload: {
            vote: 31,
            game: 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa',
            round: 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa',
        },
    })
        .then(save('9-votes-3-players-card'))
        .then(results => expect({
            results,
            db: flame.get('/'),
        }).toMatchSnapshot());
});

test('4th player votes for first card', () => {
    // Given
    const lead = {
        platform: 'facebook',
        id: 456789,
    };
    flame.loadDatabase(databases['9-votes-3-players-card']);

    // When
    return domain({
        lead,
        action: 'vote',
        payload: {
            vote: 268,
            game: 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa',
            round: 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa',
        },
    })
        .then(save('10-votes-4-players-card'))
        .then(results => expect({
            results,
            db: flame.get('/'),
        }).toMatchSnapshot());
});

test('4th player votes for second card', () => {
    // Given
    const lead = {
        platform: 'facebook',
        id: 456789,
    };
    flame.loadDatabase(databases['10-votes-4-players-card']);

    // When
    return domain({
        lead,
        action: 'vote',
        payload: {
            vote: 268,
            game: 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa',
            round: 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa',
        },
    })
        .then(save('11-votes-4-players-card'))
        .then(results => expect({
            results,
            db: flame.get('/'),
        }).toMatchSnapshot());
});

test('4th player votes for third card', () => {
    // Given
    const lead = {
        platform: 'facebook',
        id: 456789,
    };
    flame.loadDatabase(databases['11-votes-4-players-card']);

    // When
    return domain({
        lead,
        action: 'vote',
        payload: {
            vote: 31,
            game: 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa',
            round: 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa',
        },
    })
        .then(save('12-votes-4-players-card'))
        .then(results => expect({
            results,
            db: flame.get('/'),
        }).toMatchSnapshot());
});
