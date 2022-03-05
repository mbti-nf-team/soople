/* eslint-disable import/prefer-default-export */

export const unified = jest.fn().mockImplementation(() => ({
  use: jest.fn().mockImplementation(() => ({
    use: jest.fn().mockImplementation(() => ({
      use: jest.fn().mockImplementation(() => ({
        processSync: jest.fn().mockReturnValue(''),
      })),
    })),
  })),
}));
