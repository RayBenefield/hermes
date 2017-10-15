/* eslint-disable max-lines */
import _ from 'lodash';
import FbMessenger from 'fb-messenger';
import promisify from 'es6-promisify';
import actions from '../data/actions';
import { sequentialPromises } from './utils';

const createQuickReplies = ({ text }) => ({
    text,
    quick_replies: actions,
});

const createCard = ({ title, image }) => ({
    attachment: {
        type: 'template',
        payload: {
            template_type: 'generic',
            elements: [
                {
                    title,
                    image_url: image,
                },
            ],
        },
    },
});

const createCarousel = cards => ({
    attachment: {
        type: 'template',
        payload: {
            template_type: 'generic',
            elements: _.map(cards, ({ title, image }) => ({
                title,
                image_url: image,
                buttons: [
                    {
                        type: 'postback',
                        title: 'Pick',
                        payload: 'pick',
                    },
                ],
            })),
        },
    },
});

const createList = (cards, style = 'compact') => ({
    attachment: {
        type: 'template',
        payload: {
            template_type: 'list',
            top_element_style: style,
            elements: _.map(cards, ({ title, subtitle, image, buttons }) => ({
                title,
                subtitle: subtitle || null,
                image_url: image || null,
                buttons: buttons || null,
            })),
        },
    },
});

const createHeaderList = cards => createList(cards, 'large');

export default ({ verifytoken }) => ({
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
    sendMessage: (token, recipient, message) => {
        const messenger = new FbMessenger(token);
        const promiseMessage = promisify(messenger.sendMessage, messenger);

        const send = (msg) => {
            switch (msg.type) {
                case 'text':
                    return promiseMessage(recipient, createQuickReplies({
                        text: msg.payload.text,
                    }));
                case 'card':
                    return promiseMessage(recipient, createCard(msg.payload));
                case 'carousel':
                    return promiseMessage(recipient, createCarousel(msg.payload));
                case 'header-list':
                    return promiseMessage(recipient, createHeaderList(msg.payload));
                case 'list':
                    return promiseMessage(recipient, createList(msg.payload));
                default:
                    return promiseMessage(recipient, createQuickReplies({
                        text: JSON.stringify(msg),
                    }));
            }
        };

        if (!_.isArray(message)) return send(message).then();

        const messagePromises = message.map(msg => () => send(msg));
        return sequentialPromises(messagePromises).then();
    },
});
