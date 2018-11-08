import { isEmpty, isEqual, pick } from 'lodash-es';
import * as types from '@/store/types';
import AuthService from 'services/auth.service';

/* eslint-disable */
export default () => {
  return store => {
    store.subscribe(async ({ type, payload }) => {
      switch (type) {
        /**
         *  Fetch Data
         */
        case `auth/${types.LOGIN}`:
          try {
            console.log('payload', payload);

            // const { id, name, params } = payload;
            // const config = {};
            // console.log('config', config);
            const data = await AuthService.login(payload);
            console.log('data', data);

            // console.log('ADD_WIDGET | UPDATE_WIDGET', payload, data);
            // store.dispatch('widgets/updateData', { id, data });
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
