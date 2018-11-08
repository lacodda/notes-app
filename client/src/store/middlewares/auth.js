import { isEmpty, isEqual, pick } from 'lodash-es';

/* eslint-disable */
export default () => {
  return store => {
    store.subscribe(async ({ type, payload }) => {
      switch (type) {
        /**
         *  Fetch Data
         */
        case `auth/${types.INIT}`:
          try {
            // const { id, name, params } = payload;
            // const config = {};
            // console.log('config', config);
            // const { data } = await WidgetsService.fetchWidgetData(name, config);
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
