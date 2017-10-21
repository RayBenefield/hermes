import _ from 'lodash';
import text from './text';

export default ({ lead, players }) => text({
    text: `A game has started!
Your adversaries are:
${_.values(players)
    .filter(p => p.id !== lead.id)
    .map(p => `\n - ${p.first_name || 'Anonymous'}`)
    .join('')}
`,
});
