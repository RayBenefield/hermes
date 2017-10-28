import describe from 'tape-bdd';
import configureDomain from 'src/domain'; // eslint-disable-line import/no-extraneous-dependencies
import flame from '@leonardvandriel/flame';
import configureFlame from 'src/lib/local-db';  // eslint-disable-line import/no-extraneous-dependencies

const db = configureFlame(flame);
const domain = configureDomain({ db });

describe('Login Integration', (it) => {
    it('sends back a welcome message and instructions message', (assert) => {
        // Given
        const lead = {
            platform: 'facebook',
            id: 123456,
        };

        // When
        domain({
            lead,
            action: 'login',
        })
            .then(({ messages }) => assert.deepEqual(messages, [
                {
                    type: 'welcome-message',
                    payload: lead,
                },
                { type: 'instructions-message' },
            ]));
    });
});
