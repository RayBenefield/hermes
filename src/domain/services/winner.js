export default ({ unnotifiedPlayers, winner, round, winningPlayer }) => unnotifiedPlayers
    .map(player => ({
        player: player.id,
        type: 'notify-winner-message',
        payload: {
            goal: round.card,
            winner,
            player: winningPlayer,
        },
    }));
