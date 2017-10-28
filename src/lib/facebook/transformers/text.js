import actions from '../../../data/actions';

export default ({ text }) => {
    const message = { text };
    if (process.env.NODE_ENV === 'dev') message.quick_replies = actions;

    return message;
};
