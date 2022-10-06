import { fireEvent, render, screen } from '@testing-library/react';

import ImageSetting from './ImageSetting';

describe('ImageSetting', () => {
  const handleDelete = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  const renderImageSetting = () => render((
    <ImageSetting imageUrl="/test" onDelete={handleDelete} />
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

      expect(handleDelete).toBeCalledTimes(1);
    });
  });
});
