import describe from 'tape-bdd';
import voteFor from 'src/domain/services/vote'; // eslint-disable-line import/no-extraneous-dependencies

describe('Vote For', (it) => {
    it('should return a new ranked list with the vote applied', (assert) => {
        // Given
        const votes = [];
        const vote = { id: 1, contents: 'voted' };
        const candidates = [
            { id: 1, contents: 'voted' },
            { id: 2, contents: 'voted 2' },
            { id: 3, contents: 'voted 3' },
            { id: 4, contents: 'voted 4' },
        ];
        const unranked = [
            { id: 2, contents: 'voted 2' },
            { id: 3, contents: 'voted 3' },
            { id: 4, contents: 'voted 4' },
        ];

        // When
        const messages = voteFor({ vote, votes, candidates });

        // Then
        assert.deepEqual(messages, [
            {
                type: 'show-ranked-list',
                payload: {
                    ranked: [vote],
                    unranked,
                },
            },
        ]);
    });

    it('should return a ranked list with the vote applied after the first', (assert) => {
        // Given
        const votes = [
            { id: 3, contents: 'voted 3' },
        ];
        const vote = { id: 1, contents: 'voted' };
        const candidates = [
            { id: 1, contents: 'voted' },
            { id: 2, contents: 'voted 2' },
            { id: 3, contents: 'voted 3' },
            { id: 4, contents: 'voted 4' },
        ];
        const ranked = [
            { id: 3, contents: 'voted 3' },
            { id: 1, contents: 'voted' },
        ];
        const unranked = [
            { id: 2, contents: 'voted 2' },
            { id: 4, contents: 'voted 4' },
        ];

        // When
        const messages = voteFor({ vote, votes, candidates });

        // Then
        assert.deepEqual(messages, [
            {
                type: 'show-ranked-list',
                payload: {
                    ranked,
                    unranked,
                },
            },
        ]);
    });

    it('should return all votes when the last one is added', (assert) => {
        // Given
        const votes = [
            { id: 3, contents: 'voted 3' },
            { id: 4, contents: 'voted 4' },
        ];
        const vote = { id: 1, contents: 'voted' };
        const candidates = [
            { id: 1, contents: 'voted' },
            { id: 2, contents: 'voted 2' },
            { id: 3, contents: 'voted 3' },
            { id: 4, contents: 'voted 4' },
        ];
        const ranked = [
            { id: 3, contents: 'voted 3' },
            { id: 4, contents: 'voted 4' },
            { id: 1, contents: 'voted' },
            { id: 2, contents: 'voted 2' },
        ];

        // When
        const messages = voteFor({ vote, votes, candidates });

        // Then
        assert.deepEqual(messages, [
            {
                type: 'show-votes-message',
                payload: {
                    ranked,
                },
            },
        ]);
    });
});
