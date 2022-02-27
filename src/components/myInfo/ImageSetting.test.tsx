import { render } from '@testing-library/react';

import ImageSetting from './ImageSetting';

describe('ImageSetting', () => {
  const renderImageSetting = () => render((
    <ImageSetting />
  ));

  it('내 이미지에 대한 정보가 나타나야만 한다', () => {
    const { container } = renderImageSetting();

    expect(container).toHaveTextContent('이미지 선택');
    expect(container).toHaveTextContent('이미지 삭제');
  });
});
