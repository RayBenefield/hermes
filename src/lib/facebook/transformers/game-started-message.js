import text from './text';

export default ({ player, players }) => text({
    text: `A game has started ${player}!
Your adversaries are:
${players.map(p => `\n - ${p}`)}
`,
});
