import describe from 'tape-bdd';
import domain from 'src/domain'; // eslint-disable-line

const loadDB = (local = {}) => ({
    set: (key, val) => { local[key] = val; },
    get: key => local[key],
});

describe('Login', (it) => {
    it('sends back a welcome message and instructions message', (assert) => {
        // Given
        const db = loadDB();
        const lead = {
            platform: 'facebook',
            id: 123456,
        };

        // When
        domain({ db }).login({ lead })
            .then((result) => {
                assert.deepEqual(result.messages, [
                    { type: 'welcome-message' },
                    { type: 'instructions-message' },
                ]);
            });
    });

    it('adds a new player to the database', (assert) => {
        // Given
        const db = loadDB();
        const lead = {
            platform: 'facebook',
            id: 123456,
        };

        // When
        domain({ db }).login({ lead })
            .then(() => {
                assert.deepEqual(
                    db.get('players/facebook/123456'),
                    lead
                );
            });
    });

    it('welcomes back a player that already exists', (assert) => {
        // Given
        const lead = {
            platform: 'facebook',
            id: 123456,
        };
        const db = loadDB({
            'players/facebook/123456': lead,
        });

        // When
        domain({ db }).login({ lead })
            .then((result) => {
                assert.deepEqual(result.messages, [
                    { type: 'welcome-back-message' },
                ]);
            });
    });
});
