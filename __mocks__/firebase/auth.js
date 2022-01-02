export const getAuth = jest.fn().mockImplementationOnce(() => ({
  languageCode: 'ko',
}));

export const GoogleAuthProvider = jest.fn();

export const GithubAuthProvider = jest.fn();

export const signInWithRedirect = jest.fn();

export const getRedirectResult = jest.fn();

export const signOut = jest.fn();

export const updateProfile = jest.fn();

export const setPersistence = jest.fn();

export const onIdTokenChanged = jest.fn();
