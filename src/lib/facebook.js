/* eslint-disable max-lines */
import _ from 'lodash';
import FbMessenger from 'fb-messenger';
import actions from '../data/actions';

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
        const send = (msg) => {
            switch (msg.type) {
                case 'text':
                    messenger.sendQuickRepliesMessage(recipient, msg.payload.text, actions);
                    break;
                case 'card':
                    messenger.sendMessage(recipient, createCard(msg.payload));
                    break;
                case 'carousel':
                    messenger.sendMessage(recipient, createCarousel(msg.payload));
                    break;
                case 'header-list':
                    messenger.sendMessage(recipient, createHeaderList(msg.payload));
                    break;
                case 'list':
                    messenger.sendMessage(recipient, createList(msg.payload));
                    break;
                default:
                    messenger.sendQuickRepliesMessage(recipient, JSON.stringify(msg), actions);
                    break;
            }
        };

        if (!_.isArray(message)) return send(message);
        return _.forEach(message, send);
    },
});
