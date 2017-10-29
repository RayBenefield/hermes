import describe from 'tape-bdd';
import pickCard from 'src/domain/services/pick'; // eslint-disable-line import/no-extraneous-dependencies

describe('Pick Card', (it) => {
    it('should return the picked card', (assert) => {
        // Given
        const pick = { id: 0, contents: 'White Card' };
        const game = { id: 0 };
        const round = { id: 0 };
        const hand = { cards: [
            { id: 0, contents: 'White Card' },
        ] };

        // When
        const messages = pickCard({ game, round, pick, hand });

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

    it('should not let player pick a card they do not have', (assert) => {
        // Given
        const pick = { id: 0, contents: 'White Card' };
        const game = { id: 0 };
        const round = { id: 0 };
        const hand = { cards: [
            { id: 1, contents: 'Winking at old people.' },
            { id: 2, contents: 'THE KOOL-AID MAN.' },
            { id: 3, contents: 'Hurricane Katrina.' },
            { id: 4, contents: 'Powerful thighs.' },
            { id: 5, contents: 'Vigorous jazz hands.' },
            { id: 6, contents: 'BEES?' },
            { id: 7, contents: 'Morgan Freeman\'s voice.' },
            { id: 8, contents: 'Racism.' },
            { id: 9, contents: 'Daddy issues.' },
            { id: 10, contents: 'Being a motherfucking sorcerer.' },
        ] };

        // When
        const messages = pickCard({ game, round, pick, hand });

        // Then
        assert.deepEqual(messages, [
            { type: 'card-not-in-hand' },
        ]);
    });

    it('should not let a player add a new candidate', (assert) => {
        // Given
        const player = { id: 123456 };
        const pick = { id: 0, contents: 'White Card' };
        const game = { id: 0 };
        const candidates = { [player.id]: pick };
        const round = { id: 0 };
        const hand = { cards: [
            { id: 0, contents: 'White Card' },
        ] };

        // When
        const messages = pickCard({ candidates, player, game, round, pick, hand });

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
        const candidates = {
            [player2.id]: pick,
            [player3.id]: pick,
            [player4.id]: pick,
            [player5.id]: pick,
        };
        const round = { id: 3 };
        const game = { id: 0 };
        const hand = { cards: [
            { id: 0, contents: 'White Card' },
        ] };

        // When
        const messages = pickCard({ candidates, player: player1, game, round, pick, hand });

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
                    game: game.id,
                    round: round.id,
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
