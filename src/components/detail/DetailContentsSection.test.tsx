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
      isGroupMember={given.isGroupMember}
    />
  ));

  it('해당 글의 내용이 나타나야만 한다', () => {
    const { container } = renderDetailContentsSection();

    expect(container).toHaveTextContent('content');
    expect(container).toHaveTextContent('javascript');
  });

  context('isGroupMember가 true인 경우', () => {
    given('isGroupMember', () => true);

    it('"멤버들에게 보내는 메시지"가 나타나야만 한다', () => {
      const { container } = renderDetailContentsSection();

      expect(container).toHaveTextContent('멤버들에게 보내는 메시지');
    });
  });
});
