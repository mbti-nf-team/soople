import { useRouter } from 'next/router';

import { act, fireEvent, screen } from '@testing-library/react';

import useAccountWithdrawal from '@/hooks/api/auth/useAccountWithdrawal';
import useAuthRedirectResult from '@/hooks/api/auth/useAuthRedirectResult';
import useFetchUserProfile from '@/hooks/api/auth/useFetchUserProfile';
import useReauthenticateWithProvider from '@/hooks/api/auth/useReauthenticateWithProvider';
import useUpdateUser from '@/hooks/api/auth/useUpdateUser';
import useDeleteStorageFile from '@/hooks/api/storage/useDeleteStorageFile';
import useUploadStorageFile from '@/hooks/api/storage/useUploadStorageFile';
import ReactQueryWrapper from '@/test/ReactQueryWrapper';
import renderWithPortal from '@/test/renderWithPortal';
import { successToast } from '@/utils/toast';

import FIXTURE_PROFILE from '../../../fixtures/profile';

import MyInfoSettingContainer from './MyInfoSettingContainer';

jest.mock('@/hooks/api/auth/useFetchUserProfile');
jest.mock('@/hooks/api/auth/useAccountWithdrawal');
jest.mock('@/hooks/api/auth/useAuthRedirectResult');
jest.mock('@/hooks/api/storage/useDeleteStorageFile');
jest.mock('@/hooks/api/auth/useReauthenticateWithProvider');
jest.mock('@/hooks/api/storage/useUploadStorageFile');
jest.mock('@/hooks/api/auth/useUpdateUser');
jest.mock('@/utils/toast');
jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

describe('MyInfoSettingContainer', () => {
  const mockReplace = jest.fn();
  const mutate = jest.fn();
  const reset = jest.fn();
  const uploadProfileImageUrl = 'https://test.test';

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
      isLoading: given.isLoadingDelete,
    }));
    (useUpdateUser as jest.Mock).mockImplementation(() => ({
      mutate,
      isSuccess: given.isSuccessUpdate,
      isLoading: given.isLoadingUpdate,
      reset,
    }));
    (useUploadStorageFile as jest.Mock).mockImplementation(() => ({
      data: uploadProfileImageUrl,
      isSuccess: given.isSuccessUpload,
      isLoading: given.isLoadingUpload,
      mutate,
      reset,
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

    it('replace가 "/?error=unauthenticated"와 함께 호출되어야만 한다', async () => {
      renderMyInfoSettingContainer();

      await act(() => expect(mockReplace).toBeCalledWith('/?error=unauthenticated'));
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

    describe('"저장하기" 버튼을 클릭한다', () => {
      given('profileStatus', () => ({
        data: FIXTURE_PROFILE,
        isLoading: false,
        isSuccess: true,
      }));

      context('로딩중인 경우', () => {
        given('isLoadingUpdate', () => true);

        it('버튼은 disabled 상태이고 mutate가 호출되지 않아야만 한다', async () => {
          renderMyInfoSettingContainer();

          const button = screen.getByText('저장하기');
          const input = screen.getByRole('combobox');

          fireEvent.focus(input);
          fireEvent.keyDown(input, { key: 'ArrowDown', code: 40 });
          fireEvent.click(screen.getByText('백엔드'));

          await act(async () => {
            fireEvent.submit(button);
          });

          await act(() => expect(mutate).toBeCalled());
          expect(button).toHaveAttribute('disabled');
        });
      });

      context('로딩중이 아닌 경우', () => {
        given('isLoadingUpdate', () => false);

        it('mutate가 호출되야만 한다', async () => {
          renderMyInfoSettingContainer();

          const button = screen.getByText('저장하기');
          const input = screen.getByRole('combobox');

          fireEvent.focus(input);
          fireEvent.keyDown(input, { key: 'ArrowDown', code: 40 });
          fireEvent.click(screen.getByText('백엔드'));

          await act(async () => {
            fireEvent.submit(button);
          });

          await act(() => expect(mutate).toBeCalled());
        });
      });

      context('프로필 업데이트에 성공한 경우', () => {
        given('isSuccessUpdate', () => true);

        it('토스트 메시지가 호출되어야만 한다', async () => {
          renderMyInfoSettingContainer();

          const button = screen.getByText('저장하기');
          const input = screen.getByRole('combobox');

          fireEvent.focus(input);
          fireEvent.keyDown(input, { key: 'ArrowDown', code: 40 });
          fireEvent.click(screen.getByText('백엔드'));

          await act(async () => {
            fireEvent.submit(button);
          });

          await act(() => {
            expect(successToast).toBeCalledTimes(1);
            expect(reset).toBeCalledTimes(1);
          });
        });
      });
    });

    describe('"이미지 삭제" 버튼을 클릭한다', () => {
      context('이미지가 존재하지 않는 경우', () => {
        given('profileStatus', () => ({
          data: {
            ...FIXTURE_PROFILE,
            image: null,
          },
          isLoading: false,
          isSuccess: true,
        }));

        it('mutate가 호출되지 않아야만 한다', async () => {
          renderMyInfoSettingContainer();

          fireEvent.click(screen.getByText('이미지 삭제'));

          await act(() => expect(mutate).not.toBeCalled());
        });
      });

      context('로딩중인 경우', () => {
        const imageUrl = 'https://test';

        given('isLoadingDelete', () => true);
        given('profileStatus', () => ({
          data: {
            ...FIXTURE_PROFILE,
            image: imageUrl,
          },
          isLoading: false,
          isSuccess: true,
        }));

        it('"이미지 삭제" 버튼은 disabled 상태이고 delete profile image mutate가 호출되지 않아야만 한다', async () => {
          renderMyInfoSettingContainer();

          const deleteImageButton = screen.getByText('이미지 삭제');

          fireEvent.click(deleteImageButton);

          await act(() => {
            expect(mutate).not.toBeCalled();
            expect(deleteImageButton).toHaveAttribute('disabled');
          });
        });
      });

      context('로딩중이 아닌 경우', () => {
        given('isLoadingDelete', () => false);

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

          it('storage image 삭제 mutate와 delete profile image mutate가 호출되어야만 한다', async () => {
            renderMyInfoSettingContainer();

            fireEvent.click(screen.getByText('이미지 삭제'));

            await act(() => {
              expect(mutate).toBeCalledTimes(2);
              expect(mutate).toBeCalledWith(imageUrl);
              expect(mutate).toBeCalledWith({
                ...FIXTURE_PROFILE,
                image: null,
              });
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

          it('delete profile image mutate가 호출되어야만 한다', async () => {
            renderMyInfoSettingContainer();

            fireEvent.click(screen.getByText('이미지 삭제'));

            await act(() => {
              expect(mutate).toBeCalledTimes(1);
              expect(mutate).toBeCalledWith({
                ...FIXTURE_PROFILE,
                image: null,
              });
            });
          });
        });
      });
    });

    describe('"이미지 선택" 버튼을 클릭하여 이미지를 업로드한다', () => {
      const file = new File(['(⌐□_□)'], 'chucknorris.png', { type: 'image/png' });

      context('로딩중인 경우', () => {
        given('isLoadingUpload', () => true);

        it('"이미지 선택" 버튼은 disabled 상태여야만 한다', async () => {
          renderMyInfoSettingContainer();

          await act(() => expect(screen.getByText('이미지 선택')).toHaveAttribute('disabled'));
        });
      });

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

        it('storage image 삭제 mutate 호출 후 upload storage image mutate가 호출되어야만 한다', async () => {
          renderMyInfoSettingContainer();

          act(() => {
            fireEvent.change(screen.getByTestId('upload-profile-image-input'), {
              target: { files: [file] },
            });
          });

          await act(() => {
            expect(mutate).toBeCalledTimes(2);
            expect(mutate).toBeCalledWith(imageUrl);
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

        it('upload storage image mutate가 호출되어야만 한다', async () => {
          renderMyInfoSettingContainer();

          act(() => {
            fireEvent.change(screen.getByTestId('upload-profile-image-input'), {
              target: { files: [file] },
            });
          });

          await act(() => {
            expect(mutate).toBeCalledTimes(1);
          });
        });
      });

      context('이미지 업로드에 성공한 경우', () => {
        const imageUrl = 'https://test.com';

        given('isSuccessUpload', () => true);
        given('profileStatus', () => ({
          data: {
            ...FIXTURE_PROFILE,
            image: imageUrl,
          },
          isLoading: false,
          isSuccess: true,
        }));

        it('upload profile image mutate가 호출되어야만 한다', async () => {
          renderMyInfoSettingContainer();

          await act(() => {
            expect(mutate).toBeCalledTimes(1);
            expect(mutate).toBeCalledWith({
              ...FIXTURE_PROFILE,
              image: uploadProfileImageUrl,
            });
          });
        });
      });
    });

    describe('회원 탈퇴 모달창에서 "탈퇴하기" 버튼을 클릭한다', () => {
      it('클릭 이벤트가 호출되어야만 한다', async () => {
        renderMyInfoSettingContainer();

        fireEvent.click(screen.getByText('회원 탈퇴하기'));
        fireEvent.click(screen.getByText('탈퇴하기'));

        await act(() => expect(mutate).toBeCalledTimes(2));
      });
    });
  });
});
