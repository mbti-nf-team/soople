import { fireEvent, render, screen } from '@testing-library/react';

import APPLICANT_FIXTURE from '../../../fixtures/applicant';

import ApplicantItem from './ApplicantItem';

describe('ApplicantItem', () => {
  const handleToggle = jest.fn();

  beforeEach(() => {
    handleToggle.mockClear();
  });

  const renderApplicantItem = () => render((
    <ApplicantItem
      applicationForm={{
        ...APPLICANT_FIXTURE,
        isConfirm: given.isConfirm,
      }}
      onToggle={handleToggle}
    />
  ));

  context('"isConfirm"이 true인 경우', () => {
    given('isConfirm', () => true);

    describe('"해제" 버틀을 클릭한다', () => {
      it('클릭 이벤트가 호출되어야만 한다', () => {
        renderApplicantItem();

        fireEvent.click(screen.getByText('해제'));

        expect(handleToggle).toBeCalledWith({
          ...APPLICANT_FIXTURE,
          isConfirm: true,
        });
      });
    });
  });

  context('"isConfirm"이 false인 경우', () => {
    given('isConfirm', () => false);

    describe('"선택" 버틀을 클릭한다', () => {
      it('클릭 이벤트가 호출되어야만 한다', () => {
        renderApplicantItem();

        fireEvent.click(screen.getByText('선택'));

        expect(handleToggle).toBeCalledWith({
          ...APPLICANT_FIXTURE,
          isConfirm: false,
        });
      });
    });
  });
});
