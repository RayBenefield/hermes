import has from 'lodash/has';
import FbMessenger from 'fb-messenger';

export default ({ verifytoken }) => ({
    verifyToken: (query) => {
        if (query['hub.mode'] !== 'subscribe'
            || query['hub.verify_token'] !== verifytoken) {
            throw new Error('Failed validation. Make sure the validation tokens match.');
        }
    },
    extractAction: ({ raw }) => {
        if (has(raw, 'entry[0].messaging[0].message.text')) return 'text';
        if (has(raw, 'entry[0].messaging[0].postback.payload')) {
            return raw.entry[0].messaging[0].postback.payload;
        }
        return 'unknown';
    },
    extractSender: ({ raw }) => raw.entry[0].messaging[0].sender.id,
    sendText: (token, recipient, text) => {
        const messenger = new FbMessenger(token);
        messenger.sendTextMessage(recipient, text);
    },
});
