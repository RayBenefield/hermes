export default (start) => {
    let count = start;
    return () => {
        count++;
        return 0.1 * count;
    };
};
