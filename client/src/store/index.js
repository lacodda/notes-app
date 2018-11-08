import Vue from 'vue';
import Vuex from 'vuex';
import middlewares from './middlewares';
import modules from './modules';

Vue.use(Vuex);

const debug = process.env.DEBUG;
const exclude = !debug ? ['logger'] : [];

const store = new Vuex.Store({
  modules,
  plugins: middlewares(exclude),
  strict: debug,
});

// Automatically run the `init` action for every module,
// if one exists.
for (const moduleName of Object.keys(modules)) {
  if (modules[moduleName].actions.init) {
    store.dispatch(`${moduleName}/init`);
  }
}

export default store;
