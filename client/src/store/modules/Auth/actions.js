import * as types from '@/store/types';

export default {
  async init({ commit }) {
    commit(types.INIT);
  },

  login({ commit }, payload) {
    commit(types.LOGIN, payload);
    commit(types.SAVE);
  },
};
