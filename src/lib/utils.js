import util from 'util';

export const sequentialPromises = funcs => funcs
    .reduce((promise, func) =>
        promise.then(result => func().then(Array.prototype.concat.bind(result))),
        Promise.resolve([])
    );

export const logAll = obj =>
    // eslint-disable-next-line no-console
    console.log(util.inspect(obj, { showHidden: false, depth: null }));
