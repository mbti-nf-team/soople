import { act, fireEvent, screen } from '@testing-library/react';

import { Applicant } from '@/models/group';
import InjectResponsiveContext from '@/test/InjectResponsiveContext';
import renderWithPortal from '@/test/renderWithPortal';

import APPLICANT_FIXTURE from '../../../fixtures/applicant';

import ApplicationStatusHeader from './ApplicationStatusHeader';

describe('ApplicationStatusHeader', () => {
  const handleGoBack = jest.fn();
  const handleSubmit = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.clearAllTimers();
  });

  const renderApplicationStatusHeader = (applicant: Applicant) => renderWithPortal((
    <InjectResponsiveContext width={given.width}>
      <ApplicationStatusHeader
        timeRemaining={null}
        onSubmit={handleSubmit}
        goBack={handleGoBack}
        applicants={[applicant]}
      />
    </InjectResponsiveContext>
  ));

  describe('디바이스 크키 상타에 따라 버튼 문구가 달라진다', () => {
    context('모바일인 경우', () => {
      given('width', () => 400);

      it('"~명 모집 완료" 문구 버튼이 나타나야만 한다', () => {
        const { container } = renderApplicationStatusHeader({
          ...APPLICANT_FIXTURE,
          isConfirm: true,
        });

        expect(container).toHaveTextContent(/1명 모집 완료/i);
      });
    });

    context('모바일이 아닌 경우', () => {
      given('width', () => 700);

      it('"모집 완료" 문구 버튼이 나타나야만 한다', () => {
        const { container } = renderApplicationStatusHeader({
          ...APPLICANT_FIXTURE,
          isConfirm: true,
        });

        expect(container).toHaveTextContent(/모집 완료/i);
      });
    });
  });

  describe('"1명의 신청현황"을 클릭한다', () => {
    it('goback함수가 호출되어야만 한다', () => {
      renderApplicationStatusHeader(APPLICANT_FIXTURE);

      fireEvent.click(screen.getByText('1명의 신청현황'));

      expect(handleGoBack).toHaveBeenCalledTimes(1);
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

        expect(handleSubmit).toHaveBeenCalledTimes(1);
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

        act(() => {
          jest.advanceTimersByTime(400);
        });

        expect(container).not.toHaveTextContent('완료하기');
      });
    });
  });
});
