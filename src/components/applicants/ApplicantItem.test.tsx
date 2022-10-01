import { fireEvent, render, screen } from '@testing-library/react';

import InjectResponsiveContext from '@/test/InjectResponsiveContext';

import APPLICANT_FIXTURE from '../../../fixtures/applicant';

import ApplicantItem from './ApplicantItem';

describe('ApplicantItem', () => {
  const handleToggle = jest.fn();
  const mockApplicant = {
    ...APPLICANT_FIXTURE.applicant,
    image: '',
  };

  beforeEach(() => {
    handleToggle.mockClear();
  });

  const renderApplicantItem = () => render((
    <InjectResponsiveContext width={given.width}>
      <ApplicantItem
        applicationForm={{
          ...APPLICANT_FIXTURE,
          isConfirm: given.isConfirm,
          applicant: mockApplicant,
        }}
        onToggle={handleToggle}
      />
    </InjectResponsiveContext>
  ));

  context('모바일인 경우', () => {
    given('width', () => 400);

    it('프로필 이미지 크기는 "36px"이어야만 한다', () => {
      renderApplicantItem();

      expect(screen.getByTestId('default-profile-icon')).toHaveAttribute('width', '36px');
    });
  });

  context('"isConfirm"이 true인 경우', () => {
    given('isConfirm', () => true);

    describe('"해제" 버틀을 클릭한다', () => {
      it('클릭 이벤트가 호출되어야만 한다', () => {
        renderApplicantItem();

        fireEvent.click(screen.getByText('해제'));

        expect(handleToggle).toBeCalledWith({
          ...APPLICANT_FIXTURE,
          applicant: mockApplicant,
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
          applicant: mockApplicant,
          isConfirm: false,
        });
      });
    });
  });
});
