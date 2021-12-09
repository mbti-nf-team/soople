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
      },
      isVisible: false,
    },
  },
};

export default initialStore;
