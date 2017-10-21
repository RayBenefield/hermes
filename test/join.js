import describe from 'tape-bdd';
import join from 'src/domain/join'; // eslint-disable-line import/no-extraneous-dependencies

describe('Join Queue', (it) => {
    it('should add a player to the queue while reporting the size', (assert) => {
        // Given
        const queue = {};
        const player = { id: '123456' };
        const expectedQueue = { 123456: { id: '123456' } };

        // When
        const messages = join({ player, queue });

        // Then
        assert.deepEqual(messages, [
            {
                type: 'queue-joined-message',
                payload: {
                    player,
                    queue: expectedQueue,
                },
            },
        ]);
    });

    it('should start a game when a player is added to a full queue', (assert) => {
        // Given
        const queue = {
            123456: { id: '123456' },
            234567: { id: '234567' },
            345678: { id: '345678' },
            456789: { id: '456789' },
        };
        const player = { id: '567890' };

        // When
        const messages = join({ player, queue });

        // Then
        assert.deepEqual(messages, [
            {
                type: 'game-started-message',
                payload: {
                    accepted_players: {
                        [player.id]: player,
                    },
                    players: {
                        ...queue,
                        [player.id]: player,
                    },
                },
            },
        ]);
    });

    it('should inform the player when they are already in the queue', (assert) => {
        // Given
        const queue = { 123456: { id: '123456' } };
        const player = { id: '123456' };

        // When
        const messages = join({ player, queue });

        // Then
        assert.deepEqual(messages, [
            {
                type: 'already-in-queue-message',
                payload: {
                    ...queue,
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
