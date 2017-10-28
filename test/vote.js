/* eslint-disable max-len */
import describe from 'tape-bdd';
import voteFor from 'src/domain/services/vote'; // eslint-disable-line import/no-extraneous-dependencies

const player = { id: '0' };
const round = { id: 0 };
const game = { id: 0 };

describe.only('Vote For', (it) => {
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

    it('should return all votes for the player when the last one is added', (assert) => {
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

    it('should return the winner if these are the last set of votes', (assert) => {
        // Given
        const winningPlayer = { id: '3', first_name: 'Test' };
        const players = [
            { id: '0', first_name: 'Test' },
            { id: '1', first_name: 'Test' },
            { id: '2', first_name: 'Test' },
            winningPlayer,
            { id: '4', first_name: 'Test' },
        ];
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
        const votes = {
            1: ['3', '4', '0'],
            2: ['3', '4', '0'],
            3: ['2', '4', '0'],
            4: ['3', '2', '0'],
        };
        round.card = { id: 0, contents: 'Black Card' };
        const winner = { id: 4, contents: 'voted 4' };

        // When
        const messages = voteFor({ vote, playerVotes, votes, candidates, player, game, round, players });

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
            {
                type: 'show-winner-message',
                payload: {
                    goal: round.card,
                    winner,
                    player: winningPlayer,
                },
            },
        ]);
    });
});
