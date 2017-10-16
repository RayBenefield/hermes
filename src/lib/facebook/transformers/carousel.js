export default cards => ({
    attachment: {
        type: 'template',
        payload: {
            template_type: 'generic',
            elements: cards,
        },
    },
});
