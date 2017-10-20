import describe from 'tape-bdd';
import joinQueue from 'src/domain/join-queue'; // eslint-disable-line import/no-extraneous-dependencies

describe('Join Queue', (it) => {
    it('should add a player to the queue while reporting the size', (assert) => {
        // Given
        const queue = {};
        const player = { id: '123456' };
        const expectedQueue = { 123456: { id: '123456' } };

        // When
        const messages = joinQueue({ player, queue });

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
});
