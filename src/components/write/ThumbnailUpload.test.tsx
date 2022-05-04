import {
  act, fireEvent, render, screen, waitFor,
} from '@testing-library/react';

import useFetchUserProfile from '@/hooks/api/auth/useFetchUserProfile';
import useRemoveGroupThumbnail from '@/hooks/api/storage/useRemoveGroupThumbnail';
import useUploadGroupThumbnail from '@/hooks/api/storage/useUploadGroupThumbnail';
import { initialWriteFieldsState } from '@/models/group';
import InjectTestingRecoilState from '@/test/InjectTestingRecoilState';

import FIXTURE_PROFILE from '../../../fixtures/profile';

import ThumbnailUpload from './ThumbnailUpload';

jest.mock('@/hooks/api/auth/useFetchUserProfile');
jest.mock('@/hooks/api/storage/useUploadGroupThumbnail');
jest.mock('@/hooks/api/storage/useRemoveGroupThumbnail');

describe('ThumbnailUpload', () => {
  const mutate = jest.fn();
  const removeMutate = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();

    (useRemoveGroupThumbnail as jest.Mock).mockImplementation(() => ({
      mutate: removeMutate,
    }));
    (useUploadGroupThumbnail as jest.Mock).mockImplementation(() => ({
      mutate,
    }));
    (useFetchUserProfile as jest.Mock).mockImplementation(() => ({
      data: FIXTURE_PROFILE,
    }));
  });

  const renderThumbnailUpload = () => render((
    <InjectTestingRecoilState writeFields={{
      ...initialWriteFieldsState,
      thumbnail: given.thumbnail,
    }}
    >
      <ThumbnailUpload />
    </InjectTestingRecoilState>
  ));

  it('썸네일 등록 폼에 대한 내용이 나타나야만 한다', () => {
    const { container } = renderThumbnailUpload();

    expect(container).toHaveTextContent('썸네일 등록하기');
  });

  describe('썸네일 upload를 한다', () => {
    context('10MB 이상의 크기의 이미지인 경우', () => {
      const file = new File(['(⌐□_□)'], 'chucknorris.png', { type: 'image/png' });
      Object.defineProperty(file, 'size', { value: 100000000 });

      it('upload mutate 액션이 발생해야만 한다', async () => {
        const { container } = renderThumbnailUpload();

        act(() => {
          fireEvent.change(screen.getByAltText('upload-thumbnail-input'), {
            target: { files: [file] },
          });
        });

        await waitFor(async () => expect(container).toHaveTextContent('10MB 이하의 이미지만 등록할 수 있어요.'));
      });
    });

    context('10MB 이하의 크기의 이미지인 경우', () => {
      const file = new File(['(⌐□_□)'], 'chucknorris.png', { type: 'image/png' });

      it('upload mutate 액션이 발생해야만 한다', async () => {
        renderThumbnailUpload();

        act(() => {
          fireEvent.change(screen.getByAltText('upload-thumbnail-input'), {
            target: { files: [file] },
          });
        });

        await waitFor(
          async () => expect(mutate).toBeCalledWith({
            userUid: FIXTURE_PROFILE.uid, thumbnail: file,
          }),
        );
      });
    });
  });

  describe('썸네일 upload를 삭제한다', () => {
    const file = new File(['(⌐□_□)'], 'chucknorris.png', { type: 'image/png' });

    context('thumbnail이 존재하는 경우', () => {
      const thumbnailUrl = 'www.test.com';

      given('thumbnail', () => thumbnailUrl);

      it('remove mutate 액션이 발생해야만 한다', async () => {
        renderThumbnailUpload();

        act(() => {
          fireEvent.change(screen.getByAltText('upload-thumbnail-input'), {
            target: { files: [file] },
          });
        });

        await waitFor(
          async () => expect(mutate).toBeCalledWith({
            userUid: FIXTURE_PROFILE.uid, thumbnail: file,
          }),
        );

        act(() => {
          fireEvent.click(screen.getByTestId('close-icon'));
        });

        await waitFor(async () => expect(removeMutate).toBeCalledWith(thumbnailUrl));
      });
    });

    context('thumbnail이 존재하지 않는 경우', () => {
      given('thumbnail', () => null);

      it('remove mutate 액션이 발생하지 않아야만 한다', async () => {
        renderThumbnailUpload();

        act(() => {
          fireEvent.change(screen.getByAltText('upload-thumbnail-input'), {
            target: { files: [file] },
          });
        });

        await waitFor(async () => expect(mutate).toBeCalledWith({
          userUid: FIXTURE_PROFILE.uid, thumbnail: file,
        }));

        act(() => {
          fireEvent.click(screen.getByTestId('close-icon'));
        });

        await waitFor(async () => expect(removeMutate).not.toBeCalled());
      });
    });
  });
});
