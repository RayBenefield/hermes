import seedRandom from 'seedrandom';

const random = seedRandom('testing');
export default () => random().toString().replace('.', '-');
