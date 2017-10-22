import describe from 'tape-bdd';
import showHand from 'src/domain/services/hand'; // eslint-disable-line import/no-extraneous-dependencies

describe('Show Hand', (it) => {
    it('should show the player their hand', (assert) => {
        // Given
        const hand = {
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
        };
        const game = {};
        const round = {};

        // When
        const messages = showHand({ game, round, hand });

        // Then
        assert.deepEqual(messages, [
            {
                type: 'show-hand-message',
                payload: {
                    game,
                    round,
                    cards: hand,
                },
            },
        ]);
    });
});
