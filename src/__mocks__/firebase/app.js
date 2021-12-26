const firebase = jest.createMockFromModule('firebase/app');

const mockGetWithDocs = {
  get: jest.fn().mockReturnValue({
    docs: [],
  }),
};

const mockOrderBy = {
  orderBy: jest.fn().mockImplementation(() => ({
    limit: jest.fn().mockImplementation(() => (mockGetWithDocs)),
    ...mockGetWithDocs,
  })),
};

const mockFirestore = jest.fn().mockImplementation(() => ({
  collection: jest.fn().mockImplementation(() => ({
    doc: jest.fn().mockImplementation(() => ({
      update: jest.fn(),
      delete: jest.fn(),
      get: jest.fn(),
      set: jest.fn(),
    })),
    add: jest.fn().mockReturnValue({ id: 'id' }),
    where: jest.fn().mockReturnValue(mockOrderBy),
    ...mockOrderBy,
  })),
}));

firebase.initializeApp = jest.fn().mockImplementation(() => ({
  firestore: mockFirestore,
}));

firebase.analytics = jest.fn();
firebase.firestore = mockFirestore;

export default firebase;
