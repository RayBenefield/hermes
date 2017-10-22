import describe from 'tape-bdd';
import pickCard from 'src/domain/services/pick'; // eslint-disable-line import/no-extraneous-dependencies

describe('Pick Card', (it) => {
    it('should return the picked card', (assert) => {
        // Given
        const pick = { id: 0, contents: 'White Card' };
        const whiteDeck = [pick];

        // When
        const messages = pickCard({ whiteDeck, pick });

        // Then
        assert.deepEqual(messages, [
            {
                type: 'card-selected-message',
                payload: pick,
            },
        ]);
    });
});
