import flame from '@leonardvandriel/flame';
import configureDomain from '../../src/domain'; // eslint-disable-line import/no-extraneous-dependencies
import configureFlame from '../../src/lib/local-db';  // eslint-disable-line import/no-extraneous-dependencies

const db = configureFlame(flame);
const domain = configureDomain({ db });

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
