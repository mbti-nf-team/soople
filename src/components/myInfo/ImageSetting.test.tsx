import {
  act, fireEvent, render, screen,
} from '@testing-library/react';

import { errorToast } from '@/utils/toast';

import ImageSetting from './ImageSetting';

jest.mock('@/utils/toast');

describe('ImageSetting', () => {
  const handleDelete = jest.fn();
  const handleUpload = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  const renderImageSetting = () => render((
    <ImageSetting
      imageUrl="/test"
      onUpload={handleUpload}
      onDelete={handleDelete}
      isLoadingDeleteUserImage={false}
      isLoadingUpload={false}
    />
  ));

  it('내 이미지에 대한 정보가 나타나야만 한다', () => {
    const { container } = renderImageSetting();

    expect(container).toHaveTextContent('이미지 선택');
    expect(container).toHaveTextContent('이미지 삭제');
  });

  describe('"이미지 삭제" 버튼을 클릭한다', () => {
    it('클릭 이벤트가 발생해야만 한다', () => {
      renderImageSetting();

      fireEvent.click(screen.getByText('이미지 삭제'));

      expect(handleDelete).toHaveBeenCalledTimes(1);
    });
  });

  describe('"이미지 선택" 버튼을 클릭한다', () => {
    context('이미지 파일이 추가되지 않았을 경우', () => {
      it('업로드 이벤트가 호출되지 않아야만 한다', () => {
        renderImageSetting();

        fireEvent.click(screen.getByText('이미지 선택'));

        act(() => {
          fireEvent.change(screen.getByTestId('upload-profile-image-input'), {
            target: { files: [] },
          });
        });

        expect(handleUpload).not.toHaveBeenCalled();
      });
    });

    context('이미지 파일이 추가된 경우', () => {
      context('이미지 사이즈가 5MB보다 작은 경우', () => {
        const file = new File(['(⌐□_□)'], 'chucknorris.png', { type: 'image/png' });

        it('업로드 이벤트가 호출되어야만 한다', () => {
          renderImageSetting();

          fireEvent.click(screen.getByText('이미지 선택'));

          act(() => {
            fireEvent.change(screen.getByTestId('upload-profile-image-input'), {
              target: { files: [file] },
            });
          });

          expect(handleUpload).toHaveBeenCalledTimes(1);
        });
      });

      context('이미지 사이즈가 5MB보다 큰 경우', () => {
        const file = new File(['(⌐□_□)'], 'chucknorris.png', { type: 'image/png' });
        Object.defineProperty(file, 'size', { value: 100000000 });

        it('에러 토스트 메시지가 "이미지 업로드 최대 사이즈는 5MB입니다."와 함께 호출되어야만 한다', () => {
          renderImageSetting();

          fireEvent.click(screen.getByText('이미지 선택'));

          act(() => {
            fireEvent.change(screen.getByTestId('upload-profile-image-input'), {
              target: { files: [file] },
            });
          });

          expect(errorToast).toHaveBeenCalledWith('이미지 업로드 최대 사이즈는 5MB입니다.');
        });
      });
    });
  });
});
