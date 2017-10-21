export default (cards, style = 'compact') => ({
    attachment: {
        type: 'template',
        payload: {
            template_type: 'list',
            top_element_style: style,
            elements: cards.map(({ title, subtitle, imageUrl, buttons }) => ({
                title,
                subtitle: subtitle || null,
                image_url: imageUrl || null,
                buttons: buttons || null,
            })),
        },
    },
});
