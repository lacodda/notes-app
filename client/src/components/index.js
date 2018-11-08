import path from 'path';
import Vue from 'vue';
import { chain } from 'lodash-es';

// https://webpack.js.org/guides/dependency-management/#require-context
const requireWidgetComponent = require.context(
  // Look for files in the current directory
  './',
  // Look in subdirectories
  true,
  // Only include "index.js" suffixed files
  /index.js$/,
);

requireWidgetComponent.keys().forEach(fileName => {
  if (fileName === `.${__filename}`) {
    return;
  }
  // Get the component config
  const componentConfig = requireWidgetComponent(fileName);
  // get component name founded on parent directory name
  const componentName = chain(path.dirname(fileName))
    .camelCase()
    .upperFirst()
    .value();
  // Globally register the component
  Vue.component(componentName, componentConfig.default || componentConfig);
});
