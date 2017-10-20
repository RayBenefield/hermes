import describe from 'tape-bdd';
import join from 'src/domain/join'; // eslint-disable-line import/no-extraneous-dependencies

describe('Join', (it) => {
    it('should trigger a join event', (assert) => {
        // Given
        const player = { id: '123456' };

        // When
        const messages = join({ player });

        // Then
        assert.deepEqual(messages, [
            {
                type: 'joined-queue-event',
                payload: player,
            },
        ]);
    });
});
