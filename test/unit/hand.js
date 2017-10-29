import describe from 'tape-bdd';
import showHand from 'src/domain/services/hand'; // eslint-disable-line import/no-extraneous-dependencies

describe('Show Hand', (it) => {
    it('should show the player their hand to pick a card', (assert) => {
        // Given
        const hand = { cards: [
            { id: 0, contents: 'Being a motherfucking sorcerer.' },
            { id: 1, contents: 'Winking at old people.' },
            { id: 2, contents: 'THE KOOL-AID MAN.' },
            { id: 3, contents: 'Hurricane Katrina.' },
            { id: 4, contents: 'Powerful thighs.' },
            { id: 5, contents: 'Vigorous jazz hands.' },
            { id: 6, contents: 'BEES?' },
            { id: 7, contents: 'Morgan Freeman\'s voice.' },
            { id: 8, contents: 'Racism.' },
            { id: 9, contents: 'Daddy issues.' },
        ] };
        const game = { id: 0 };
        const round = { id: 0 };

        // When
        const messages = showHand({ game, round, hand });

        // Then
        assert.deepEqual(messages, [
            {
                type: 'show-hand-for-picking-message',
                payload: {
                    game: game.id,
                    round: round.id,
                    cards: hand.cards,
                },
            },
        ]);
    });

    it('should show the player their hand without picking a card', (assert) => {
        // Given
        const player = { id: 123456 };
        const hand = { cards: [
            { id: 0, contents: 'Being a motherfucking sorcerer.' },
            { id: 1, contents: 'Winking at old people.' },
            { id: 2, contents: 'THE KOOL-AID MAN.' },
            { id: 3, contents: 'Hurricane Katrina.' },
            { id: 4, contents: 'Powerful thighs.' },
            { id: 5, contents: 'Vigorous jazz hands.' },
            { id: 6, contents: 'BEES?' },
            { id: 7, contents: 'Morgan Freeman\'s voice.' },
            { id: 8, contents: 'Racism.' },
            { id: 9, contents: 'Daddy issues.' },
        ] };
        const game = { id: 0 };
        const round = { id: 0 };
        const candidates = { [player.id]: {} };

        // When
        const messages = showHand({ candidates, player, game, round, hand });

        // Then
        assert.deepEqual(messages, [
            {
                type: 'show-hand-message',
                payload: hand,
            },
        ]);
    });
});
