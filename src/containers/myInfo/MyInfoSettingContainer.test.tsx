import { useRouter } from 'next/router';

import { act, fireEvent, screen } from '@testing-library/react';

import useAccountWithdrawal from '@/hooks/api/auth/useAccountWithdrawal';
import useAuthRedirectResult from '@/hooks/api/auth/useAuthRedirectResult';
import useFetchUserProfile from '@/hooks/api/auth/useFetchUserProfile';
import useReauthenticateWithProvider from '@/hooks/api/auth/useReauthenticateWithProvider';
import useUpdateUser from '@/hooks/api/auth/useUpdateUser';
import useDeleteStorageFile from '@/hooks/api/storage/useDeleteStorageFile';
import ReactQueryWrapper from '@/test/ReactQueryWrapper';
import renderWithPortal from '@/test/renderWithPortal';

import FIXTURE_PROFILE from '../../../fixtures/profile';

import MyInfoSettingContainer from './MyInfoSettingContainer';

jest.mock('@/hooks/api/auth/useFetchUserProfile');
jest.mock('@/hooks/api/auth/useAccountWithdrawal');
jest.mock('@/hooks/api/auth/useAuthRedirectResult');
jest.mock('@/hooks/api/storage/useDeleteStorageFile');
jest.mock('@/hooks/api/auth/useReauthenticateWithProvider');
jest.mock('@/hooks/api/auth/useUpdateUser');
jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

describe('MyInfoSettingContainer', () => {
  const mockReplace = jest.fn();
  const mutate = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();

    (useRouter as jest.Mock).mockImplementation(() => ({
      replace: mockReplace,
    }));

    (useAuthRedirectResult as jest.Mock).mockImplementation(() => ({
      data: FIXTURE_PROFILE,
    }));

    (useReauthenticateWithProvider as jest.Mock).mockImplementation(() => ({
      mutate,
    }));
    (useFetchUserProfile as jest.Mock).mockImplementation(() => (given.profileStatus));
    (useAccountWithdrawal as jest.Mock).mockImplementation(() => ({
      mutate,
    }));
    (useDeleteStorageFile as jest.Mock).mockImplementation(() => ({
      mutate,
    }));
    (useUpdateUser as jest.Mock).mockImplementation(() => ({
      mutate,
    }));
  });

  const renderMyInfoSettingContainer = () => renderWithPortal((
    <ReactQueryWrapper>
      <MyInfoSettingContainer />
    </ReactQueryWrapper>
  ));

  context('로딩중인 경우', () => {
    given('profileStatus', () => ({
      data: null,
      isLoading: true,
      isSuccess: false,
    }));

    it('아무것도 나타나지 않아야만 한다', async () => {
      const { container } = renderMyInfoSettingContainer();

      await act(() => expect(container).toBeEmptyDOMElement());
    });
  });

  context('로그인이 안된 사용자인 경우', () => {
    given('profileStatus', () => ({
      data: null,
      isLoading: false,
      isSuccess: true,
    }));

    it('replace가 "/?error=unauthenticated"와 함께 호출되어야만 한다', () => {
      renderMyInfoSettingContainer();

      expect(mockReplace).toBeCalledWith('/?error=unauthenticated');
    });
  });

  context('로그인한 사용자인 경우', () => {
    given('profileStatus', () => ({
      data: FIXTURE_PROFILE,
      isLoading: false,
      isSuccess: true,
    }));

    it('내 정보 수정 페이지에 대한 내용이 나타나야만 한다', async () => {
      const { container } = renderMyInfoSettingContainer();

      await act(() => expect(container).toHaveTextContent(`${FIXTURE_PROFILE.position}`));
    });

    describe('"이미지 삭제" 버튼을 클릭한다', () => {
      context(`이미지 url이 ${process.env.NEXT_PUBLIC_FIREBASE_STORAGE_URL}로 시작하는 경우`, () => {
        const imageUrl = `${process.env.NEXT_PUBLIC_FIREBASE_STORAGE_URL}/test`;

        given('profileStatus', () => ({
          data: {
            ...FIXTURE_PROFILE,
            image: imageUrl,
          },
          isLoading: false,
          isSuccess: true,
        }));

        it('storage image 삭제 mutate와 delete profile image mutate가 호출되어야만 한다', () => {
          renderMyInfoSettingContainer();

          fireEvent.click(screen.getByText('이미지 삭제'));

          expect(mutate).toBeCalledTimes(2);
          expect(mutate).toBeCalledWith(imageUrl);
          expect(mutate).toBeCalledWith({
            ...FIXTURE_PROFILE,
            image: null,
          });
        });
      });

      context(`이미지 url이 ${process.env.NEXT_PUBLIC_FIREBASE_STORAGE_URL}로 시작하지 않는 경우`, () => {
        const imageUrl = 'https://test';

        given('profileStatus', () => ({
          data: {
            ...FIXTURE_PROFILE,
            image: imageUrl,
          },
          isLoading: false,
          isSuccess: true,
        }));

        it('delete profile image mutate가 호출되어야만 한다', () => {
          renderMyInfoSettingContainer();

          fireEvent.click(screen.getByText('이미지 삭제'));

          expect(mutate).toBeCalledTimes(1);
          expect(mutate).toBeCalledWith({
            ...FIXTURE_PROFILE,
            image: null,
          });
        });
      });
    });

    describe('회원 탈퇴 모달창에서 "탈퇴하기" 버튼을 클릭한다', () => {
      it('클릭 이벤트가 호출되어야만 한다', async () => {
        renderMyInfoSettingContainer();

        fireEvent.click(screen.getByText('회원 탈퇴하기'));
        fireEvent.click(screen.getByText('탈퇴하기'));

        expect(mutate).toBeCalledTimes(2);
      });
    });
  });
});
