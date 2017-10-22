import describe from 'tape-bdd';
import showHand from 'src/domain/services/hand'; // eslint-disable-line import/no-extraneous-dependencies

describe('Show Hand', (it) => {
    it('should show the player their hand to pick a card', (assert) => {
        // Given
        const hand = { cards: {
            0: { contents: 'Being a motherfucking sorcerer.' },
            1: { contents: 'Winking at old people.' },
            2: { contents: 'THE KOOL-AID MAN.' },
            3: { contents: 'Hurricane Katrina.' },
            4: { contents: 'Powerful thighs.' },
            5: { contents: 'Vigorous jazz hands.' },
            6: { contents: 'BEES?' },
            7: { contents: 'Morgan Freeman\'s voice.' },
            8: { contents: 'Racism.' },
            9: { contents: 'Daddy issues.' },
        } };
        const game = {};
        const round = {};

        // When
        const messages = showHand({ game, round, hand });

        // Then
        assert.deepEqual(messages, [
            {
                type: 'show-hand-for-picking-message',
                payload: {
                    game,
                    round,
                    cards: hand.cards,
                },
            },
        ]);
    });

    it('should show the player their hand without picking a card', (assert) => {
        // Given
        const player = { id: 123456 };
        const hand = { cards: {
            0: { contents: 'Being a motherfucking sorcerer.' },
            1: { contents: 'Winking at old people.' },
            2: { contents: 'THE KOOL-AID MAN.' },
            3: { contents: 'Hurricane Katrina.' },
            4: { contents: 'Powerful thighs.' },
            5: { contents: 'Vigorous jazz hands.' },
            6: { contents: 'BEES?' },
            7: { contents: 'Morgan Freeman\'s voice.' },
            8: { contents: 'Racism.' },
            9: { contents: 'Daddy issues.' },
        } };
        const game = {};
        const round = { candidates: { [player.id]: {} } };

        // When
        const messages = showHand({ player, game, round, hand });

        // Then
        assert.deepEqual(messages, [
            {
                type: 'show-hand-message',
                payload: hand,
            },
        ]);
    });
});
