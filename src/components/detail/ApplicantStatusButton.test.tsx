import {
  act, fireEvent, render, screen,
} from '@testing-library/react';

import APPLICANT_FIXTURE from '../../../fixtures/applicants';
import PROFILE_FIXTURE from '../../../fixtures/profile';

import ApplicantStatusButton from './ApplicantStatusButton';

describe('ApplicantStatusButton', () => {
  const handleApply = jest.fn();
  const handleVisibleSignInModal = jest.fn();
  const handleCancelApply = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  const renderApplicantStatusButton = () => render((
    <ApplicantStatusButton
      onApply={handleApply}
      isCompleted={given.isCompleted}
      onVisibleSignInModal={handleVisibleSignInModal}
      applicant={given.applicant}
      user={given.user}
      onCancelApply={handleCancelApply}
    />
  ));

  context('isCompleted가 false인 경우', () => {
    given('isCompleted', () => false);

    context('"applicant"가 존재하지 않는 경우', () => {
      given('applicant', () => false);

      it('"신청하기"버튼이 보여야만 한다', () => {
        const { container } = renderApplicantStatusButton();

        expect(container).toHaveTextContent('신청하기');
      });

      describe('"신청하기" 버튼을 클릭한다', () => {
        context('사용자가 로그인한 경우', () => {
          given('user', () => PROFILE_FIXTURE);

          it('신청 폼 모달창이 나타난다', () => {
            const { container } = renderApplicantStatusButton();

            fireEvent.click(screen.getByText('신청하기'));

            expect(container).toHaveTextContent(/신청/);
          });

          describe('신청 모달창에서 "신청하기"를 클릭한다', () => {
            it('클릭 이벤트가 호출되어야만 한다', async () => {
              const { container } = renderApplicantStatusButton();

              fireEvent.click(screen.getByText('신청하기'));
              await act(async () => {
                await fireEvent.change(screen.getByPlaceholderText('간단한 소개글을 입력하세요'), {
                  target: { value: 'test' },
                });
                fireEvent.submit(screen.getByTestId('apply-button'));
              });

              expect(handleApply).toBeCalledTimes(1);
              expect(container).not.toHaveTextContent(/소개글/);
            });
          });

          describe('신청 모달창에서 "닫기" 버튼을 클릭한다', () => {
            it('모달창이 나타나지 않아야한다', async () => {
              const { container } = renderApplicantStatusButton();

              fireEvent.click(screen.getByText('신청하기'));
              fireEvent.click(screen.getByText('닫기'));

              expect(container).not.toHaveTextContent(/소개글/);
            });
          });
        });

        context('사용자가 로그인하지 않은 경우', () => {
          given('user', () => null);

          it('visibleSignInModal 이벤트가 발생해야만 한다', () => {
            renderApplicantStatusButton();

            fireEvent.click(screen.getByText('신청하기'));

            expect(handleVisibleSignInModal).toBeCalledTimes(1);
          });
        });
      });
    });

    context('"applicant"가 존재하는 경우', () => {
      given('applicant', () => APPLICANT_FIXTURE);

      describe('"신청 취소" 버튼을 클릭한다', () => {
        it('클릭 이벤트가 발생해야만 한다', () => {
          renderApplicantStatusButton();

          fireEvent.click(screen.getByText('신청 취소'));

          expect(handleCancelApply).toBeCalledWith('2');
        });
      });
    });
  });

  context('isCompleted가 true인 경우', () => {
    given('isCompleted', () => true);

    it('"팀원 보기"버튼이 보여야만 한다', () => {
      const { container } = renderApplicantStatusButton();

      expect(container).toHaveTextContent('팀원 보기');
    });
  });
});
