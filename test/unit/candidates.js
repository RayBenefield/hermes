import describe from 'tape-bdd';
import showCandidates from 'src/domain/services/candidates'; // eslint-disable-line import/no-extraneous-dependencies

describe('Show Candidates', (it) => {
    it('should show the player the candidates', (assert) => {
        // Given
        const player = { id: '0' };
        const game = { id: 0 };
        const round = { id: 0 };
        const candidates = {
            0: { id: 1, contents: 'first' },
            1: { id: 2, contents: 'second' },
            2: { id: 3, contents: 'third' },
            3: { id: 4, contents: 'fourth' },
            4: { id: 5, contents: 'fifth' },
        };
        const unranked = [
            { id: 2, contents: 'second' },
            { id: 3, contents: 'third' },
            { id: 4, contents: 'fourth' },
            { id: 5, contents: 'fifth' },
        ];

        // When
        const messages = showCandidates({ player, game, round, candidates });

        // Then
        assert.deepEqual(messages, [
            {
                type: 'candidates-ready-message',
                payload: {
                    game: game.id,
                    round: round.id,
                    unranked,
                },
            },
        ]);
    });
});
