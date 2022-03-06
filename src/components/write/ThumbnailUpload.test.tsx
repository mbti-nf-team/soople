import { render } from '@testing-library/react';

import ThumbnailUpload from './ThumbnailUpload';

describe('ThumbnailUpload', () => {
  const renderThumbnailUpload = () => render((
    <ThumbnailUpload />
  ));

  it('썸네일 등록 폼에 대한 내용이 나타나야만 한다', () => {
    const { container } = renderThumbnailUpload();

    expect(container).toHaveTextContent('썸네일 등록하기');
  });
});
