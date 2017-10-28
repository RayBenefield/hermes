import transmute from 'transmutation';
import * as enterDomain from './services'; // eslint-disable-line import/no-unresolved, import/extensions
import configureContext from './context';

export default ({ db }) => {
    const context = configureContext({ db });
    const getContext = context.get;
    const saveContext = context.save;

    return transmute()
        .switch('action', getContext)
        .extend('messages', transmute()
            .switch('action', enterDomain))
        .do(stream => Promise.all(
            stream.messages.map(msg =>
                transmute({ ...stream, ...msg }).switch('type', saveContext))
        ));
};
