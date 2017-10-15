export default ({ title, image }) => ({
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
