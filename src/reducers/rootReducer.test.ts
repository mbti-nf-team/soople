import { HYDRATE } from 'next-redux-wrapper';
import { AnyAction } from 'redux';

import { WriteFields } from '@/models/group';

import rootReducer from './rootReducer';
import { AppState } from './store';

describe('rootReducer', () => {
  const fieldsInitialState: WriteFields = {
    title: '',
    contents: '',
    tags: [],
    category: '',
    recruitmentEndSetting: 'manual',
    recruitmentEndDate: '',
  };

  const initialReducer: AppState = {
    authReducer: {
      auth: null,
      authError: null,
      user: null,
      isVisible: false,
    },
    groupReducer: {
      groups: [],
      group: null,
      groupId: null,
      comments: [],
      groupError: null,
      writeFields: fieldsInitialState,
      isVisible: false,
    },
  };

  context('action type이 HYDRATE일 때', () => {
    const action: AnyAction = {
      type: HYDRATE,
      payload: {
        auth: 'test',
      },
    };

    it('추가된 상태가 나타나야 한다', () => {
      const result = rootReducer(initialReducer, action);

      expect(result).toEqual({
        ...initialReducer,
        auth: 'test',
      });
    });
  });

  context('action type이 HYDRATE가 아닐 때', () => {
    const action: AnyAction = {
      type: 'test',
      payload: {
        auth: 'test',
      },
    };

    it('리듀서 store가 그대로인 상태로 반환해야 한다', () => {
      const result = rootReducer(initialReducer, action);

      expect(result).toEqual(initialReducer);
    });
  });
});
