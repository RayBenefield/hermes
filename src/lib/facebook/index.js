/* eslint-disable max-lines */
import _ from 'lodash';
import yaml from 'js-yaml';
import FbMessenger from 'fb-messenger';
import promisify from 'es6-promisify';
import * as transformers from './transformers'; // eslint-disable-line import/no-unresolved, import/extensions
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
        extractActionWithPayload: ({ raw }) => {
            if (_.has(raw, 'entry[0].messaging[0].message.quick_reply.payload')) {
                return yaml.safeLoad(raw.entry[0].messaging[0].message.quick_reply.payload);
            }
            if (_.has(raw, 'entry[0].messaging[0].message.text')) return 'text';
            if (_.has(raw, 'entry[0].messaging[0].postback.payload')) {
                return yaml.safeLoad(raw.entry[0].messaging[0].postback.payload);
            }
            return { action: 'unknown' };
        },
        extractLead: ({ raw }) => ({
            id: raw.entry[0].messaging[0].sender.id,
            platform: 'facebook',
        }),
        transform: ({ messages }) => _.flatten(messages.map(
            ({ type, payload }) => {
                if (type in transformers) return transformers[type](payload);
                return transformers.text({ text: `There's no message setup for [${type}]` });
            }
        )),
        sendMessage: (recipient, message) => {
            const send = msg => promiseMessage(recipient, msg);

            if (!_.isArray(message)) return send(message).then();

            const messagePromises = message.map(msg => () => send(msg));
            return sequentialPromises(messagePromises).then();
        },
    };
};
