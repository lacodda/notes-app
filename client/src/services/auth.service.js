// import { parseParams } from 'util/helpers';
import Api from './api';

export default {
  /**
   * Login
   *
   * @param {Object} [params={}]
   * @returns
   */
  async login(params = {}) {
    return Api().post('/auth/login', {
      params,
      // paramsSerializer: p => parseParams(p),
    });
  },
};
