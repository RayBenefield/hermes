import describe from 'tape-bdd';
import voteFor from 'src/domain/services/vote'; // eslint-disable-line import/no-extraneous-dependencies

const player = { id: '0' };
const round = { id: 0 };
const game = { id: 0 };

describe('Vote For', (it) => {
    it('should return a new ranked list with the vote applied', (assert) => {
        // Given
        const playerVotes = [];
        const vote = { id: 5, contents: 'voted 5' };
        const candidates = {
            0: { id: 1, contents: 'voted' },
            1: { id: 2, contents: 'voted 2' },
            2: { id: 3, contents: 'voted 3' },
            3: { id: 4, contents: 'voted 4' },
            4: { id: 5, contents: 'voted 5' },
        };
        const unranked = [
            { id: 2, contents: 'voted 2' },
            { id: 3, contents: 'voted 3' },
            { id: 4, contents: 'voted 4' },
        ];

        // When
        const messages = voteFor({ player, vote, playerVotes, candidates, game, round });

        // Then
        assert.deepEqual(messages, [
            {
                type: 'show-ranked-list',
                payload: {
                    game: game.id,
                    round: round.id,
                    vote: '4',
                    ranked: [vote],
                    unranked,
                },
            },
        ]);
    });

    it('should return a ranked list with the vote applied after the first', (assert) => {
        // Given
        const playerVotes = [
            { id: 3, contents: 'voted 3' },
        ];
        const vote = { id: 5, contents: 'voted 5' };
        const candidates = {
            0: { id: 1, contents: 'voted' },
            1: { id: 2, contents: 'voted 2' },
            2: { id: 3, contents: 'voted 3' },
            3: { id: 4, contents: 'voted 4' },
            4: { id: 5, contents: 'voted 5' },
        };
        const ranked = [
            { id: 3, contents: 'voted 3' },
            { id: 5, contents: 'voted 5' },
        ];
        const unranked = [
            { id: 2, contents: 'voted 2' },
            { id: 4, contents: 'voted 4' },
        ];

        // When
        const messages = voteFor({ vote, playerVotes, candidates, player, game, round });

        // Then
        assert.deepEqual(messages, [
            {
                type: 'show-ranked-list',
                payload: {
                    game: game.id,
                    round: round.id,
                    vote: '4',
                    ranked,
                    unranked,
                },
            },
        ]);
    });

    it('should return all playerVotes when the last one is added', (assert) => {
        // Given
        const playerVotes = [
            { id: 3, contents: 'voted 3' },
            { id: 4, contents: 'voted 4' },
        ];
        const vote = { id: 5, contents: 'voted 5' };
        const candidates = {
            0: { id: 1, contents: 'voted' },
            1: { id: 2, contents: 'voted 2' },
            2: { id: 3, contents: 'voted 3' },
            3: { id: 4, contents: 'voted 4' },
            4: { id: 5, contents: 'voted 5' },
        };
        const ranked = [
            { id: 3, contents: 'voted 3' },
            { id: 4, contents: 'voted 4' },
            { id: 5, contents: 'voted 5' },
            { id: 2, contents: 'voted 2' },
        ];

        // When
        const messages = voteFor({ vote, playerVotes, candidates, player, game, round });

        // Then
        assert.deepEqual(messages, [
            {
                type: 'show-votes-message',
                payload: {
                    game: game.id,
                    round: round.id,
                    vote: '4',
                    ranked,
                },
            },
        ]);
    });
});
