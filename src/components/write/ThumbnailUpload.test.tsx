/* eslint-disable import/no-extraneous-dependencies */
import {
  act,
  fireEvent, render, screen, waitFor,
} from '@testing-library/react';

import useFetchUserProfile from '@/hooks/api/auth/useFetchUserProfile';
import useUploadGroupThumbnail from '@/hooks/api/storage/useUploadGroupThumbnail';

import FIXTURE_PROFILE from '../../../fixtures/profile';

import ThumbnailUpload from './ThumbnailUpload';

jest.mock('@/hooks/api/auth/useFetchUserProfile');
jest.mock('@/hooks/api/storage/useUploadGroupThumbnail');

describe('ThumbnailUpload', () => {
  const mutate = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();

    (useUploadGroupThumbnail as jest.Mock).mockImplementation(() => ({
      mutate,
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
    const file = new File(['image'], 'test.png', { type: 'image/png' });

    it('mutate 액션이 발생해야만 한다', async () => {
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
});
