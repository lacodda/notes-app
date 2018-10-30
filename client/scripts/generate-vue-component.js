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

const componentsPath = 'src/components';
const args = process.argv.slice(2);

const error = (...args) => {
  console.log(colors.red, ...args);
};

const success = (...args) => {
  console.log(colors.green, ...args);
};

if (!args.length) {
  error('You must provide a name for the component!');
  return;
}

const componentNameArr = args[0].split('/');
const componentName = _.chain(componentNameArr.pop())
  .camelCase()
  .upperFirst()
  .value();
const componentPath = path.join(
  __dirname,
  '../',
  componentsPath,
  ...componentNameArr,
  componentName,
);

if (fs.existsSync(componentPath)) {
  error(`${componentName} directory already exists!`);
  return;
}

const componentContent = `<template>
  <h1>%NAME%</h1>
</template>

<script>
export default {
name: '%NAME%',
props: {
  data: String,
},
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
`;

const indexFileContent = `export { default } from './%NAME%.vue';
`;

const componentFilePath = `${path.join(componentPath, `${componentName}.vue`)}`;
const indexFilePath = `${path.join(componentPath, 'index.js')}`;

fs.mkdirSync(componentPath);
fs.appendFileSync(
  componentFilePath,
  componentContent.replace(/%NAME%/, componentName),
);
fs.appendFileSync(
  indexFilePath,
  indexFileContent.replace(/%NAME%/, componentName),
);

success(colors.green, 'Component', componentName, 'generated!');
