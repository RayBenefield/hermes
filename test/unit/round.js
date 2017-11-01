import describe from 'tape-bdd';
import startRound from 'src/domain/services/round'; // eslint-disable-line import/no-extraneous-dependencies

describe('Start Round', (it) => {
    it('should notify players of a new round', (assert) => {
        // Given
        const round = { id: 0 };
        const game = { id: 0 };
        const card = { id: 0, contents: 'Black Card' };
        const players = [{ id: '0' }];

        // When
        const messages = startRound({ players, round, game, card });

        // Then
        assert.deepEqual(messages, [
            {
                player: '0',
                type: 'new-goal-message',
                payload: {
                    game: game.id,
                    round: round.id,
                    card,
                },
            },
        ]);
    });
});
