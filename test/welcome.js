import describe from 'tape-bdd';
import domain from 'src/domain'; // eslint-disable-line

describe('Welcome', (it) => {
    it('sends back a welcome message and instructions message', assert => assert
        .deepEqual(domain().welcome(), {
            messages: [
                { type: 'welcome-message' },
                { type: 'instructions-message' },
            ],
        })
    );
});
