import describe from 'tape-bdd';
import pickCard from 'src/domain/services/pick'; // eslint-disable-line import/no-extraneous-dependencies

describe('Pick Card', (it) => {
    it('should return the picked card', (assert) => {
        // Given
        const pick = { id: 0, contents: 'White Card' };
        const whiteDeck = [pick];
        const game = { id: 0 };
        const round = { id: 0 };

        // When
        const messages = pickCard({ game, round, whiteDeck, pick });

        // Then
        assert.deepEqual(messages, [
            {
                type: 'card-selected-message',
                payload: {
                    card: pick,
                },
            },
            { type: 'wait-for-votes-message' },
        ]);
    });

    it('should not let a player add a new candidate', (assert) => {
        // Given
        const player = { id: 123456 };
        const pick = { id: 0, contents: 'White Card' };
        const whiteDeck = [pick];
        const game = { id: 0 };
        const candidates = { [player.id]: pick };
        const round = { id: 0, candidates };

        // When
        const messages = pickCard({ player, game, round, whiteDeck, pick });

        // Then
        assert.deepEqual(messages, [
            {
                type: 'card-already-selected-message',
                payload: {
                    card: pick,
                },
            },
            { type: 'wait-for-votes-message' },
        ]);
    });

    it('should show player votes when player is last candidate', (assert) => {
        // Given
        const player1 = { id: 123456 };
        const player2 = { id: 234567 };
        const player3 = { id: 345678 };
        const player4 = { id: 456789 };
        const player5 = { id: 567890 };
        const pick = { id: 0, contents: 'White Card' };
        const whiteDeck = [pick];
        const candidates = {
            [player2.id]: pick.id,
            [player3.id]: pick.id,
            [player4.id]: pick.id,
            [player5.id]: pick.id,
        };
        const round = { id: 3, candidates };

        // When
        const messages = pickCard({ player: player1, round, whiteDeck, pick });

        // Then
        assert.deepEqual(messages, [
            {
                type: 'card-selected-message',
                payload: {
                    card: pick,
                },
            },
            {
                type: 'candidates-ready-message',
                payload: {
                    pick,
                    unranked: [
                        pick,
                        pick,
                        pick,
                        pick,
                    ],
                },
            },
        ]);
    });
});
