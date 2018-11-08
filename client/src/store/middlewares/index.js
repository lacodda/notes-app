// Register all Vuex module by a camelCase version of their filename.
import { camelCase } from 'lodash-es';

// Get all the files
const requireModule = require.context(
  // Search for files in the current directory
  '.',
  // Search for files in subdirectories
  true,
  // Exclude index.js file as well as any file that has
  // 'actions', 'mutations', or 'getters' in their name.
  // Also, include only files which ends with .js
  // Ignore unit test files
  /^(?!.*(index|\.unit)).*\.js$/,
);

export default (exclude = []) => {
  return requireModule
    .keys()
    .filter(name => {
      name = camelCase(name.split('/')[1].replace(/(\.\/|\.js)/g, ''));
      return !exclude.includes(name);
    })
    .map(name => requireModule(name).default());
};
