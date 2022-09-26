import { render, screen } from '@testing-library/react';

import ReactQueryWrapper from '@/test/ReactQueryWrapper';
import { yesterday } from '@/utils/utils';

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
        applicants={given.applicants || []}
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

      it('아무것도 나타나지 않아야만 한다', () => {
        const { container } = renderDetailStatusButton(group);

        expect(container).toBeEmptyDOMElement();
      });
    });

    context('로딩중이 아닌 경우', () => {
      given('isApplicantsLoading', () => false);

      context('모집이 완료되지 않았고 모집중이 아닐 경우', () => {
        it('display은 "none"가 되어야만 한다', () => {
          renderDetailStatusButton({
            ...group,
            recruitmentEndSetting: 'automatic',
            recruitmentEndDate: yesterday(new Date()),
          });

          expect(screen.getByTestId('applicant-status-button-wrapper')).toHaveStyle({
            display: 'none',
          });
        });
      });

      context('모집이 완료된 경우', () => {
        given('applicants', () => ([{
          applicant: {
            uid: '1',
            isConfirm: true,
          },
        }]));

        it('display은 "flex"가 되어야만 한다', () => {
          renderDetailStatusButton({
            ...group,
            isCompleted: true,
          });

          expect(screen.getByTestId('applicant-status-button-wrapper')).toHaveStyle({
            display: 'flex',
          });
        });
      });

      context('모집중인 경우', () => {
        it('display은 "flex"가 되어야만 한다', () => {
          renderDetailStatusButton(group);

          expect(screen.getByTestId('applicant-status-button-wrapper')).toHaveStyle({
            display: 'flex',
          });
        });
      });
    });
  });
});
