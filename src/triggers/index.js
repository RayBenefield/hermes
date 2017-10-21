import _ from 'lodash';
import * as triggers from './triggers'; // eslint-disable-line import/no-unresolved, import/extensions

export default config => _.mapValues(triggers, trigger => trigger(config));
