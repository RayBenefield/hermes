import describe from 'tape-bdd';
import domain from 'src/domain'; // eslint-disable-line

describe('Login', (it) => {
    it('sends back a welcome message and instructions message', (assert) => {
        // Given
        const lead = {
            platform: 'facebook',
            id: 123456,
        };

        // When
        domain.login({ lead })
            .then((result) => {
                assert.deepEqual(result.messages, [
                    {
                        type: 'welcome-message',
                        payload: lead,
                    },
                    { type: 'instructions-message' },
                ]);
            });
    });

    it('welcomes back a player that already exists', (assert) => {
        // Given
        const lead = {
            platform: 'facebook',
            id: 123456,
        };
        const player = {
            id: '1234-2345-3456-4567-5678',
            identities: [lead],
        };

        // When
        domain.login({ player, lead })
            .then((result) => {
                assert.deepEqual(result.messages, [
                    {
                        type: 'welcome-back-message',
                        payload: {
                            lead,
                            player,
                        },
                    },
                ]);
            });
    });
});
