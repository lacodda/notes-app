import * as types from '@/store/types';

export default {
  async init({ commit }) {
    commit(types.INIT);
  },
  /**
   * Register
   *
   * @param {*} { commit }
   * @param {*} payload
   */
  register({ commit }, payload) {
    commit(types.REGISTER, payload);
    commit(types.SAVE);
  },
  /**
   * Login
   *
   * @param {*} { commit }
   * @param {*} payload
   */
  login({ commit }, payload) {
    commit(types.LOGIN, payload);
    commit(types.SAVE);
  },
};
