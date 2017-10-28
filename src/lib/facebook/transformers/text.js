import actions from '../../../data/actions';

export default ({ text }) => ({
    text,
    quick_replies: process.env.NODE_ENV === 'dev' ? actions : [],
});
