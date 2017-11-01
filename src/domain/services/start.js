export default ({ unnotifiedPlayers, players }) => unnotifiedPlayers.map(player => ({
    player: player.id,
    type: 'notify-game-started-message',
    payload: {
        players: players.map(p => ({
            id: p.id.toString(),
            first_name: p.first_name,
        })),
    },
}));
