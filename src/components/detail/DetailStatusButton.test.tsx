import { render } from '@testing-library/react';

import ReactQueryWrapper from '@/test/ReactQueryWrapper';

import GROUP_FIXTURE from '../../../fixtures/group';
import PROFILE_FIXTURE from '../../../fixtures/profile';

import DetailStatusButton from './DetailStatusButton';

jest.mock('next/router', () => ({
  useRouter: jest.fn().mockImplementation(() => ({
    replace: jest.fn(),
  })),
}));

describe('DetailStatusButton', () => {
  const handleApply = jest.fn();
  const handleVisibleSignInModal = jest.fn();
  const handleCancelApply = jest.fn();

  const renderDetailStatusButton = (group = GROUP_FIXTURE) => render((
    <ReactQueryWrapper>
      <DetailStatusButton
        user={PROFILE_FIXTURE}
        group={group}
        applicants={[]}
        isApplicantsLoading={given.isApplicantsLoading}
        onVisibleSignInModal={handleVisibleSignInModal}
        onApply={handleApply}
        onCancelApply={handleCancelApply}
      />
    </ReactQueryWrapper>
  ));

  context('작성자인 경우', () => {
    it('"신청현황 보기" 버튼이 나타나야만 한다', () => {
      const { container } = renderDetailStatusButton();

      expect(container).toHaveTextContent('신청현황 보기');
    });
  });

  context('작성자가 아닌 경우', () => {
    const group = {
      ...GROUP_FIXTURE,
      writer: {
        ...GROUP_FIXTURE.writer,
        uid: '1',
      },
    };

    context('로딩중인 경우', () => {
      given('isApplicantsLoading', () => true);

      it('"로딩중..." 버튼이 니타나야만 한다', () => {
        const { container } = renderDetailStatusButton(group);

        expect(container).toHaveTextContent('로딩중...');
      });
    });

    context('로딩중이 아닌 경우', () => {
      given('isApplicantsLoading', () => false);

      it('"신청하기" 버튼이 나타나야만 한다', () => {
        const { container } = renderDetailStatusButton(group);

        expect(container).toHaveTextContent('신청하기');
      });
    });
  });
});
