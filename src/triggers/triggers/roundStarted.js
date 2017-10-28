import transmute from 'transmutation';
import { setupEntities } from '../../domain';

export default ({ db, fb }) => {
    const { get, save } = setupEntities({ db });

    return transmute()
        .extend(...get.game)
        .extend(...get.blackDeck)
        .extend(...get.card)
        .extend(...get.playersFromGame)
        .extend('messages', ({ round, game, card }) => [
            {
                type: 'new-goal-message',
                payload: {
                    game: game.id,
                    round: round.id,
                    card,
                },
            },
        ])
        .do(...save.roundForGame)
        .do(...save.goalForRound)
        .do(({ players, messages }) => Promise.all(
            players.map(lead => transmute({ lead, messages })
                .extend('facebookMessages', fb.transform)
                .do(({ facebookMessages }) =>
                    fb.sendMessages(lead.id, facebookMessages)))));
};
