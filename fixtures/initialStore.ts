import { GroupStore } from '@/reducers/groupSlice';
import { MyInfoStore } from '@/reducers/myInfoSlice';

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
        content: '',
        title: '',
        tags: [],
        category: '',
        recruitmentEndDate: '',
        recruitmentEndSetting: 'automatic',
      },
      tagsCount: [],
      isVisible: false,
      applicants: [],
    } as GroupStore,
    myInfoReducer: {
      myInfoError: null,
      recruitedGroups: [],
    } as MyInfoStore,
  },
};

export default initialStore;
