import _ from 'lodash';

export default cards => ({
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
