import flame from '@leonardvandriel/flame';
import * as databases from './database'; // eslint-disable-line import/no-unresolved,import/extensions
import configureDomain from '../../src/domain';
import configureFlame from '../../src/lib/local-db';
import configureSave from '../utils/save-db';

const db = configureFlame(flame);
const domain = configureDomain({ db });
const save = configureSave(flame); // eslint-disable-line no-unused-vars
beforeEach(() => flame.loadDatabase(undefined));

test('sends back a welcome message and instructions message', () => {
    // Given
    const lead = {
        platform: 'facebook',
        id: 123456,
    };

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