const fs = require('fs');
const path = require('path');
const _ = require('lodash');

const colors = {
  white: '\x1b[37m',
  green: '\x1b[32m',
  cyan: '\x1b[36m',
  red: '\x1b[31m',
  default: '\x1b[0m',
};

const storePath = 'src/store';
const args = process.argv.slice(2);

const error = (...args) => {
  console.log(colors.red, ...args);
};

const success = (...args) => {
  console.log(colors.green, ...args);
};

if (!args.length) {
  error('You must provide a name for the module!');
  return;
}

// const moduleName = args[0];
const moduleName = _.chain(args[0])
  .camelCase()
  .upperFirst()
  .value();
const modulePath = path.join(
  __dirname,
  '../',
  storePath,
  'modules',
  moduleName,
);
const typesFile = path.join(__dirname, '../', storePath, 'types.js');

if (fs.existsSync(modulePath)) {
  error(`${moduleName} directory already exists!`);
  return;
}

const stateContent = `import getters from './getters';
import actions from './actions';
import mutations from './mutations';

const state = {};

export default {
  state,
  getters,
  actions,
  mutations
};
`;

const getterContent = `import * as types from '@/store/types';

export default {

};
`;

const actonsContent = `import * as types from '@/store/types';

export default {
  async init({ commit }) {
    commit(types.INIT_%NAME%);
  },
};
`;

const mutationsContent = `import * as types from '@/store/types';

export default {
  [types.INIT_%NAME%](state) {},
};
`;

const typesContent = `/**
 * Module %MODULE_NAME% types
 */

export const INIT_%NAME% = 'INIT_%NAME%';

`;

const statePath = `${path.join(modulePath, `${moduleName}.js`)}`;
const gettersPath = `${path.join(modulePath, 'getters.js')}`;
const actionsPath = `${path.join(modulePath, 'actions.js')}`;
const mutationsPath = `${path.join(modulePath, 'mutations.js')}`;

fs.mkdirSync(modulePath);
fs.appendFileSync(statePath, stateContent);
fs.appendFileSync(gettersPath, getterContent);
fs.appendFileSync(
  actionsPath,
  actonsContent.replace(/%NAME%/, moduleName.toUpperCase()),
);
fs.appendFileSync(
  mutationsPath,
  mutationsContent.replace(/%NAME%/, moduleName.toUpperCase()),
);
fs.appendFileSync(
  typesFile,
  typesContent
    .replace(/%MODULE_NAME%/, moduleName)
    .replace(/%NAME%/g, moduleName.toUpperCase()),
);

success(colors.green, 'Module', moduleName, 'generated!');
