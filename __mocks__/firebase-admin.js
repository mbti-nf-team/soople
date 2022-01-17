const firebaseAdmin = {
  apps: [],
  initializeApp: jest.fn(),
  credential: {
    cert: jest.fn(),
  },
  auth: jest.fn().mockImplementation(() => ({
    verifyIdToken: jest.fn(),
  })),
};

export default firebaseAdmin;
