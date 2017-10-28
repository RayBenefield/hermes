let count = 0;
export default () => {
    const id = 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx'
        .replace(/[x]/g, String.fromCharCode(97 + count));
    count++;
    return id;
};
