/* eslint-disable import/no-extraneous-dependencies */
import {
  act,
  fireEvent, render, screen, waitFor,
} from '@testing-library/react';

import useFetchUserProfile from '@/hooks/api/auth/useFetchUserProfile';
import useRemoveGroupThumbnail from '@/hooks/api/storage/useRemoveGroupThumbnail';
import useUploadGroupThumbnail from '@/hooks/api/storage/useUploadGroupThumbnail';

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
      data: given.thumbnailUrl,
    }));
    (useFetchUserProfile as jest.Mock).mockImplementation(() => ({
      data: FIXTURE_PROFILE,
    }));
  });

  const renderThumbnailUpload = () => render((
    <ThumbnailUpload />
  ));

  it('썸네일 등록 폼에 대한 내용이 나타나야만 한다', () => {
    const { container } = renderThumbnailUpload();

    expect(container).toHaveTextContent('썸네일 등록하기');
  });

  describe('썸네일 upload를 한다', () => {
    const file = new File(['(⌐□_□)'], 'chucknorris.png', { type: 'image/png' });

    it('upload mutate 액션이 발생해야만 한다', async () => {
      renderThumbnailUpload();

      act(() => {
        fireEvent.change(screen.getByAltText('upload-thumbnail-input'), {
          target: { files: [file] },
        });
      });

      await waitFor(async () => expect(mutate).toBeCalledWith({
        userUid: FIXTURE_PROFILE.uid, thumbnail: file,
      }));
    });
  });

  describe('썸네일 upload를 삭제한다', () => {
    const file = new File(['(⌐□_□)'], 'chucknorris.png', { type: 'image/png' });

    context('thumbnailUrl이 존재하는 경우', () => {
      const thumbnailUrl = 'www.test.com';

      given('thumbnailUrl', () => thumbnailUrl);

      it('remove mutate 액션이 발생해야만 한다', async () => {
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

        await waitFor(async () => expect(removeMutate).toBeCalledWith(thumbnailUrl));
      });
    });

    context('thumbnailUrl이 존재하지 않는 경우', () => {
      given('thumbnailUrl', () => null);

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
