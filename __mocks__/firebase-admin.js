const firebaseAdmin = {
  apps: [],
  initializeApp: jest.fn(),
  credential: {
    cert: jest.fn(),
  },
  auth: jest.fn().mockImplementation(() => ({
    verifyIdToken: jest.fn(),
  })),
  firestore: jest.fn().mockImplementation(() => ({
    collection: jest.fn(),
  })),
};

export default firebaseAdmin;
