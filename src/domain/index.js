import _ from 'lodash';
import transmute from 'transmutation';
import * as enterDomain from './services'; // eslint-disable-line import/no-unresolved, import/extensions
import configureContext from './context';
import configureEntities from './entities';

export const services = enterDomain;
export const setupContext = configureContext;
export const setupEntities = configureEntities;

export default ({ db, uuid, random, delay }) => {
    const context = configureContext({ db, uuid, random, delay });
    const getContext = context.get;
    const saveContext = context.save;
    const saveContextByAction = context.saveByAction;

    return transmute()
        .switch('action', getContext)
        .extend('unaddressedMessages', transmute()
            .switch('action', enterDomain))
        .do(transmute().switch('action', saveContextByAction))
        .do(stream => Promise.all(stream.unaddressedMessages.map(msg =>
            transmute({ ...stream, ...msg }).switch('type', saveContext))))
        .extend('messages', ({ lead, player, unaddressedMessages }) => _.groupBy(unaddressedMessages
            .map((m) => {
                if (!m.player) {
                    if (!player) return { ...m, player: lead.id };
                    return { ...m, player: player.id };
                }
                return m;
            }), 'player'));
};
