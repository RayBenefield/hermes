import text from './text';

export default ({ players }) => text({
    text: `A game has started!
Your adversaries are:
${Object.values(players).map(p => `\n - ${p.first_name || 'Anonymous'}`).join('')}
`,
});
