import text from './text';
import list from './show-ranked-list';

export default payload => [
    text({
        text: 'Below are the candidates from the other players... time to rate them from best to worst.',
    }),
    list(payload),
];
