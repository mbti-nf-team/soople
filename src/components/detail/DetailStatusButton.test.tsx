import { render } from '@testing-library/react';

import GROUP_FIXTURE from '../../../fixtures/group';
import PROFILE_FIXTURE from '../../../fixtures/profile';

import DetailStatusButton from './DetailStatusButton';

describe('DetailStatusButton', () => {
  const handleApply = jest.fn();
  const handleVisibleSignInModal = jest.fn();
  const handleCancelApply = jest.fn();

  const renderDetailStatusButton = (group = GROUP_FIXTURE) => render((
    <DetailStatusButton
      user={PROFILE_FIXTURE}
      group={group}
      applicants={[]}
      onVisibleSignInModal={handleVisibleSignInModal}
      onApply={handleApply}
      onCancelApply={handleCancelApply}
    />
  ));

  context('작성자인 경우', () => {
    it('"신청현황 보기" 버튼이 나타나야만 한다', () => {
      const { container } = renderDetailStatusButton();

      expect(container).toHaveTextContent('신청현황 보기');
    });
  });

  context('작성자가 아닌 경우', () => {
    it('"신청하기" 버튼이 나타나야만 한다', () => {
      const { container } = renderDetailStatusButton({
        ...GROUP_FIXTURE,
        writer: {
          ...GROUP_FIXTURE.writer,
          uid: '1',
        },
      });

      expect(container).toHaveTextContent('신청하기');
    });
  });
});
