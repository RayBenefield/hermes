import describe from 'tape-bdd';
import join from 'src/domain/services/join'; // eslint-disable-line import/no-extraneous-dependencies

describe('Join Queue', (it) => {
    it('should add a player to the queue while reporting the size', (assert) => {
        // Given
        const queue = [];
        const player = { id: '123456' };
        const expectedQueue = ['123456'];

        // When
        const messages = join({ player, queue });

        // Then
        assert.deepEqual(messages, [
            {
                type: 'queue-joined-message',
                payload: {
                    player: player.id,
                    queue: expectedQueue,
                },
            },
        ]);
    });

    it('should start a game when a player is added to a full queue', (assert) => {
        // Given
        const queue = [
            '234567',
            '345678',
            '456789',
            '567890',
        ];
        const player = { id: '123456', first_name: 'First', platform: 'facebook' };
        const players = [
            { id: '234567', first_name: 'Second' },
            { id: '345678', first_name: 'Third' },
            { id: '456789', first_name: 'Fourth' },
            { id: '567890', first_name: 'Fifth' },
        ];
        const expectedPlayers = [
            { id: '123456', first_name: 'First' },
            { id: '234567', first_name: 'Second' },
            { id: '345678', first_name: 'Third' },
            { id: '456789', first_name: 'Fourth' },
            { id: '567890', first_name: 'Fifth' },
        ];

        // When
        const messages = join({ player, players, queue });

        // Then
        assert.deepEqual(messages, [
            {
                type: 'game-started-message',
                payload: {
                    players: expectedPlayers,
                },
            },
        ]);
    });

    it('should inform the player when they are already in the queue', (assert) => {
        // Given
        const queue = ['123456'];
        const player = { id: '123456' };

        // When
        const messages = join({ player, queue });

        // Then
        assert.deepEqual(messages, [
            {
                type: 'already-in-queue-message',
                payload: {
                    queue,
                },
            },
        ]);
    });

    it('should welcome a new player', (assert) => {
        // Given

        // When
        const messages = join();

        // Then
        assert.deepEqual(messages, [
            { type: 'player-does-not-exist-message' },
        ]);
    });
});
