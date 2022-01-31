import { render } from '@testing-library/react';

import GROUP_FIXTURE from '../../../fixtures/group';

import DetailContentsSection from './DetailContentsSection';

describe('DetailContentsSection', () => {
  const renderDetailContentsSection = () => render((
    <DetailContentsSection
      group={{
        ...GROUP_FIXTURE,
        tags: ['javascript'],
      }}
    />
  ));

  it('해당 글의 내용이 나타나야만 한다', () => {
    const { container } = renderDetailContentsSection();

    expect(container).toHaveTextContent('content');
    expect(container).toHaveTextContent('javascript');
  });
});
