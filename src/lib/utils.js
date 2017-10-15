/* eslint-disable import/prefer-default-export */
export const sequentialPromises = funcs => funcs
    .reduce((promise, func) =>
        promise.then(result => func().then(Array.prototype.concat.bind(result))),
        Promise.resolve([])
    );
