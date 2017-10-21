import text from './text';

export default ({ queue }) => text({
    text: `You have been added to the Queue. When it has 5 people we will start the game and let you know. Currently there are ${Object.keys(queue).length} in the queue.`,
});
