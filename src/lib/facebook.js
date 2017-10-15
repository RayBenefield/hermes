import has from 'lodash/has';
import FbMessenger from 'fb-messenger';

export default ({ verifytoken }) => ({
    verifyToken: (query) => {
        if (query['hub.mode'] !== 'subscribe'
            || query['hub.verify_token'] !== verifytoken) {
            throw new Error('Failed validation. Make sure the validation tokens match.');
        }
    },
    extractMessage: (payload) => {
        if (payload.object !== 'page') throw new Error('Not from a Facebook Page');
        if (!has(payload, 'entry[0].messaging[0].message')) throw new Error('Not a message');

        const message = payload.entry[0].messaging[0];
        return {
            context: {
                request: {
                    platform: 'facebook',
                    channel: message.recipient.id,
                    user: message.sender.id,
                },
            },
            input: message.message.text,
        };
    },
    sendText: (token, recipient, text) => {
        const messenger = new FbMessenger(token);
        messenger.sendTextMessage(recipient, text);
    },
});
