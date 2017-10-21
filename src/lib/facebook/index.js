/* eslint-disable max-lines */
import _ from 'lodash';
import yaml from 'js-yaml';
import request from 'request-promise-native';
import * as transformers from './transformers'; // eslint-disable-line import/no-unresolved, import/extensions
import { sequentialPromises } from '../utils';

export default ({ verifytoken, accesstoken }) => {
    const sendFbMessage = recipient => message => request({
        url: 'https://graph.facebook.com/v2.6/me/messages',
        qs: { access_token: accesstoken },
        method: 'POST',
        json: {
            recipient: { id: recipient },
            message,
        },
    });
    const getProfile = id => request({
        method: 'GET',
        url: `https://graph.facebook.com/v2.6/${id}`,
        json: true,
        qs: { access_token: accesstoken },
    });

    return {
        verifyToken: (query) => {
            if (query['hub.mode'] !== 'subscribe'
                || query['hub.verify_token'] !== verifytoken) {
                throw new Error('Failed validation. Make sure the validation tokens match.');
            }
        },
        extractLead: ({ raw }) => ({
            id: raw.entry[0].messaging[0].sender.id,
            platform: 'facebook',
        }),
        enrichLead: ({ lead }) => getProfile(lead.id),
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
        transform: ({ lead, messages }) => [].concat(...messages.map(
            ({ type, payload }) => {
                if (type in transformers) return transformers[type]({ ...payload, lead });
                return transformers.text({ text: `There's no message setup for [${type}]` });
            }
        )),
        sendMessages: (recipient, message) => {
            if (!_.isArray(message)) return sendFbMessage(recipient)(message).then();

            const messagePromises = message
                .map(msg => () => sendFbMessage(recipient)(msg));
            return sequentialPromises(messagePromises).then();
        },
    };
};
