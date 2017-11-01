import describe from 'tape-bdd';
import start from 'src/domain/services/start'; // eslint-disable-line import/no-extraneous-dependencies

describe('Start Game', (it) => {
    it('should notify players of a new game', (assert) => {
        // Given
        const players = [
            { id: '123456', first_name: 'Ray' },
            { id: '234567', first_name: 'Hermes' },
            { id: '345678', first_name: 'Hermdon' },
            { id: '456789', first_name: 'Hermda' },
            { id: '567890', first_name: 'Hermshire' },
        ];
        const unnotifiedPlayers = [
            { id: '567890', first_name: 'Hermshire' },
        ];

        // When
        const messages = start({ unnotifiedPlayers, players });

        // Then
        assert.deepEqual(messages, [
            {
                player: '567890',
                type: 'notify-game-started-message',
                payload: {
                    players,
                },
            },
        ]);
    });
});
