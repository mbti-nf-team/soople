const initialStore = {
  initialState: {
    authReducer: {
      auth: null,
      authError: null,
      user: 'user',
      isVisible: false,
    },
    groupReducer: {
      group: null,
      groupError: null,
      groupId: null,
      writeFields: {
        contents: '',
        title: '',
        tags: [],
        category: '',
        recruitmentEndDate: '',
        recruitmentEndSetting: 'automatic',
      },
      isVisible: false,
    },
  },
};

export default initialStore;
