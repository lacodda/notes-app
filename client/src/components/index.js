import path from 'path';
import Vue from 'vue';
import * as _ from 'lodash';

// https://webpack.js.org/guides/dependency-management/#require-context
const requireWidgetComponent = require.context(
  // Look for files in the current directory
  './',
  // Look in subdirectories
  true,
  // Only include "Widget.vue" suffixed files
  /index.vue$/,
);

requireWidgetComponent.keys().forEach(fileName => {
  // Get the component config
  const componentConfig = requireWidgetComponent(fileName);
  // get component name founded on parent directory name
  const componentName = _.chain(path.dirname(fileName))
    .camelCase()
    .upperFirst()
    .value();

  // Globally register the component
  Vue.component(componentName, componentConfig.default || componentConfig);
});
