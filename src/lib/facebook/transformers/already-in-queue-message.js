import text from './text';

export default queue => text({
    text: `You are already in the Queue. Currently there are ${Object.keys(queue).length} people in it.`,
});
