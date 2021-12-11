const initialStore = {
  initialState: {
    authReducer: {
      auth: null,
      authError: null,
      user: 'user',
      isVisible: false,
    },
    groupReducer: {
      groupError: null,
      groupId: null,
      writeFields: {
        contents: '',
        title: '',
        tags: [],
        category: '',
        recruitmentEndDate: '',
        recruitmentEndSetting: 'automatic',
        recruitmentNumber: 1,
      },
      isVisible: false,
    },
  },
};

export default initialStore;
