/* eslint-disable max-lines */
import _ from 'lodash';
import actions from '../../data/actions';

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

export default {
    text: ({ text }) => ({
        text,
        quick_replies: actions,
    }),
    card: ({ title, image }) => ({
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
    }),
    carousel: cards => ({
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
    }),
    'header-list': cards => createList(cards, 'large'),
    list: createList,
};
