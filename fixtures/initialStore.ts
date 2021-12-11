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
      },
      isVisible: false,
    },
  },
};

export default initialStore;
