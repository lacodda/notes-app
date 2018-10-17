/* @flow */

import { ActionContext } from 'vuex';

/** * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 *                                                   INTERFACES                                                      *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

export interface ModalData {
  widgetId: string;
  component: string;
}

interface ModalState {
  stack: ModalData[];
}

interface ModalInterface extends ActionContext<ModalState> {}

/** * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 *                                                        TYPES                                                      *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

const Types = {
  SHOW_MODAL: 'SHOW_MODAL',
  HIDE_MODAL: 'HIDE_MODAL',
  REPLACE_MODAL: 'REPLACE_MODAL',
};

/** * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 *                                                        STATE                                                      *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

const state: ModalState = {
  stack: [],
};

/** * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 *                                                       GETTERS                                                     *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

const getters = {
  modal: ({ stack }: ModalState) => (id: number) => stack[id],
  currentModal: ({ stack }: ModalState) => stack[stack.length - 1],
  modalsList: ({ stack }: ModalState) => stack,
  modalsCount: ({ stack }: ModalState) => stack.length,
};

/** * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 *                                                       ACTIONS                                                     *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

const actions = {
  showModal({ commit }: ModalInterface, data: ModalData) {
    commit(Types.SHOW_MODAL, data);
  },

  hideModal({ commit }: ModalInterface) {
    commit(Types.HIDE_MODAL);
  },

  replaceModal({ commit }: ModalInterface, data: ModalData) {
    commit(Types.REPLACE_MODAL, data);
  },
};

/** * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 *                                                     MUTATIONS                                                     *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

const mutations = {
  [Types.SHOW_MODAL]({ stack }: ModalState, data: ModalData): void {
    stack.push(data);
  },

  [Types.HIDE_MODAL]({ stack }: ModalState): void {
    stack.pop();
  },

  [Types.REPLACE_MODAL]({ stack }: ModalState, data: ModalData): void {
    stack.pop();
    stack.push(data);
  },
};

/** * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 *                                                     EXPORTS                                                       *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

export default {
  Types,
  state,
  getters,
  actions,
  mutations,
};
