export default ({ players, round, game, card }) => players.map(player => ({
    player: player.id,
    type: 'new-goal-message',
    payload: {
        game: game.id,
        round: round.id,
        card,
    },
}));
