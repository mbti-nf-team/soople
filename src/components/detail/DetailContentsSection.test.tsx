import { render } from '@testing-library/react';

import GROUP_FIXTURE from '../../../fixtures/group';

import DetailContentsSection from './DetailContentsSection';

describe('DetailContentsSection', () => {
  const renderDetailContentsSection = () => render((
    <DetailContentsSection
      group={{
        ...GROUP_FIXTURE,
        tags: ['javascript'],
        message: given.message,
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

    context('메시지가 존재하는 경우', () => {
      given('message', () => '메시지');

      it('"멤버들에게 보내는 메시지"가 나타나야만 한다', () => {
        const { container } = renderDetailContentsSection();

        expect(container).toHaveTextContent('멤버들에게 보내는 메시지');
      });
    });

    context('메시지가 존재하지 않는 경우', () => {
      given('message', () => '');

      it('"멤버들에게 보내는 메시지가 없어요."가 나타나야만 한다', () => {
        const { container } = renderDetailContentsSection();

        expect(container).toHaveTextContent('멤버들에게 보내는 메시지가 없어요.');
      });
    });
  });
});
