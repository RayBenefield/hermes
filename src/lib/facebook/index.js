/* eslint-disable max-lines */
import _ from 'lodash';
import transmute from 'transmutation';
import FbMessenger from 'fb-messenger';
import promisify from 'es6-promisify';
import transformers from './transformers';
import { sequentialPromises } from '../utils';

export default ({ verifytoken, accesstoken }) => {
    const messenger = new FbMessenger(accesstoken);
    const promiseMessage = promisify(messenger.sendMessage, messenger);

    return {
        verifyToken: (query) => {
            if (query['hub.mode'] !== 'subscribe'
                || query['hub.verify_token'] !== verifytoken) {
                throw new Error('Failed validation. Make sure the validation tokens match.');
            }
        },
        extractAction: ({ raw }) => {
            if (_.has(raw, 'entry[0].messaging[0].message.quick_reply.payload')) {
                return raw.entry[0].messaging[0].message.quick_reply.payload;
            }
            if (_.has(raw, 'entry[0].messaging[0].message.text')) return 'text';
            if (_.has(raw, 'entry[0].messaging[0].postback.payload')) {
                return raw.entry[0].messaging[0].postback.payload;
            }
            return 'unknown';
        },
        extractSender: ({ raw }) => raw.entry[0].messaging[0].sender.id,
        sendMessage: (recipient, message) => {
            const send = msg => transmute(msg)
                .extend('facebookTemplate', ({ type, payload }) =>
                    transformers[type](payload)
                )
                .then(({ facebookTemplate }) =>
                    promiseMessage(recipient, facebookTemplate)
                );

            if (!_.isArray(message)) return send(message).then();

            const messagePromises = message.map(msg => () => send(msg));
            return sequentialPromises(messagePromises).then();
        },
    };
};
