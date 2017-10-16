import text from './text';
import showGoal from './new-goal-message';

export default ({ card }) => [
    text({ text: 'And now the next goal...' }),
    showGoal({ card }),
];
