import { fireEvent, render, screen } from '@testing-library/react';

import { Applicant } from '@/models/group';

import APPLICANT_FIXTURE from '../../../fixtures/applicant';

import ApplicationStatusHeader from './ApplicationStatusHeader';

describe('ApplicationStatusHeader', () => {
  const handleGoBack = jest.fn();
  const handleSubmit = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  const renderApplicationStatusHeader = (applicant: Applicant) => render((
    <ApplicationStatusHeader
      onSubmit={handleSubmit}
      goBack={handleGoBack}
      applicants={[applicant]}
    />
  ));

  describe('"1명의 신청현황"을 클릭한다', () => {
    it('goback함수가 호출되어야만 한다', () => {
      renderApplicationStatusHeader(APPLICANT_FIXTURE);

      fireEvent.click(screen.getByText('1명의 신청현황'));

      expect(handleGoBack).toBeCalledTimes(1);
    });
  });

  context('승인된 신청자가 1명 이상인 경우', () => {
    describe('"모집완료" 버튼 클릭 후 모달창에서 "완료하기" 버튼을 클릭한다', () => {
      it('클릭 이벤트가 호출되어야만 한다', () => {
        renderApplicationStatusHeader({
          ...APPLICANT_FIXTURE,
          isConfirm: true,
        });

        fireEvent.click(screen.getByText('모집 완료'));
        fireEvent.click(screen.getByText('완료하기'));

        expect(handleSubmit).toBeCalledTimes(1);
      });
    });

    describe('모달창에서 "닫기" 버튼을 클릭한다', () => {
      it('모달창이 보이지 않아야만 한다', () => {
        const { container } = renderApplicationStatusHeader({
          ...APPLICANT_FIXTURE,
          isConfirm: true,
        });

        fireEvent.click(screen.getByText('모집 완료'));
        fireEvent.click(screen.getByText('닫기'));

        expect(container).not.toHaveTextContent('완료하기');
      });
    });
  });
});
