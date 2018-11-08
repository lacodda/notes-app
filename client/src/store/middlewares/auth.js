import { isEmpty, isEqual, pick } from 'lodash-es';
import * as types from '@/store/types';
import AuthService from 'services/auth.service';

/* eslint-disable */
export default () => {
  return store => {
    store.subscribe(async ({ type, payload }) => {
      switch (type) {
        /**
         *  Register
         */
        case `auth/${types.REGISTER}`:
          try {
            const data = await AuthService.register(payload);
            console.log('data', data);
          } catch (e) {
            console.error(e.message);
          }

          break;
        /**
         *  Login
         */
        case `auth/${types.LOGIN}`:
          try {
            const data = await AuthService.login(payload);
            console.log('data', data);
          } catch (e) {
            console.error(e.message);
          }

          break;

        default:
          break;
      }
    });
  };
};
