import describe from 'tape-bdd';
import pick from 'src/domain/services/pick'; // eslint-disable-line import/no-extraneous-dependencies

describe('Pick Card', (it) => {
    it('should return the picked card', (assert) => {
        // Given
        const payload = 0;
        const card = { id: 0, contents: 'White Card' };
        const whiteDeck = [card];

        // When
        const messages = pick({ whiteDeck, payload });

        // Then
        assert.deepEqual(messages, [
            {
                type: 'card-selected-message',
                payload: card,
            },
        ]);
    });
});
