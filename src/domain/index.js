import transmute from 'transmutation';
import * as enterDomain from './services'; // eslint-disable-line import/no-unresolved, import/extensions
import configureContext from './context';
import configureEntities from './entities';

export const services = enterDomain;
export const setupContext = configureContext;
export const setupEntities = configureEntities;

export default ({ db, uuid, random }) => {
    const context = configureContext({ db, uuid, random });
    const getContext = context.get;
    const saveContext = context.save;

    return transmute()
        .switch('action', getContext)
        .extend('messages', transmute()
            .switch('action', enterDomain))
        .do(stream => Promise.all(stream.messages.map(msg =>
            transmute({ ...stream, ...msg }).switch('type', saveContext))));
};
