// import { parseParams } from 'util/helpers';
import Api from './api';

export default {
  /**
   * Register
   *
   * @param {Object} [params={}]
   * @returns
   */
  async register(params = {}) {
    return Api().post('/auth/register', params);
  },
  /**
   * Login
   *
   * @param {Object} [params={}]
   * @returns
   */
  async login(params = {}) {
    return Api().post(
      '/auth/login',
      params,
      // {
      //   params,
      //   paramsSerializer: p => parseParams(p),
      // }
    );
  },
};
