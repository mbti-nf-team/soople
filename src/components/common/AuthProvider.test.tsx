import { useDispatch } from 'react-redux';

import { render } from '@testing-library/react';
import { onIdTokenChanged, User } from 'firebase/auth';

import AuthProvider, { tokenChangedCallback } from './AuthProvider';

describe('AuthProvider', () => {
  const MockComponent = () => <>Mock</>;
  const dispatch = jest.fn();

  beforeEach(() => {
    (useDispatch as jest.Mock).mockImplementation(() => dispatch);
  });

  const renderAuthProvider = () => render((
    <AuthProvider>
      <MockComponent />
    </AuthProvider>
  ));

  it('유저정보에 관한 토큰 함수가 호출되어야만 한다', () => {
    renderAuthProvider();

    expect(dispatch).toBeCalled();
    expect(onIdTokenChanged).toBeCalled();
  });
});

describe('tokenChangedCallback', () => {
  const dispatch = jest.fn();

  beforeEach(() => {
    dispatch.mockClear();

    (useDispatch as jest.Mock).mockImplementation(() => dispatch);
  });

  context('user 정보가 존재하지 않는 경우', () => {
    it('dispatch 액션 "setUser"가 null로 호출되어야만 한다', () => {
      const tokenChanged = tokenChangedCallback(dispatch);

      tokenChanged(null);

      expect(dispatch).toBeCalledWith({
        payload: null,
        type: 'auth/setUser',
      });
    });
  });

  context('user 정보가 존재하는 경우', () => {
    const mockGetIdToken = jest.fn().mockReturnValue('token');

    it('dispatch 액션 "setUser"가 null로 호출되어야만 한다', () => {
      const tokenChanged = tokenChangedCallback(dispatch);

      tokenChanged({
        uid: 'test',
        getIdToken: mockGetIdToken,
      } as unknown as User);

      expect(mockGetIdToken).toBeCalled();
    });
  });
});
