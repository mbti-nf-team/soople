import { GroupStore } from '@/reducers/groupSlice';

const initialStore = {
  initialState: {
    authReducer: {
      auth: null,
      authError: null,
      user: 'user',
      isVisible: false,
    },
    groupReducer: {
      groupId: null,
      groups: [],
      group: null,
      comments: [],
      groupError: null,
      writeFields: {
        contents: '',
        title: '',
        tags: [],
        category: '',
        recruitmentEndDate: '',
        recruitmentEndSetting: 'automatic',
      },
      isVisible: false,
    } as GroupStore,
  },
};

export default initialStore;
