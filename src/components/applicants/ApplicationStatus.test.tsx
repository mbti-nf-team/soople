import { render } from '@testing-library/react';

import APPLICANT_FIXTURE from '../../../fixtures/applicant';

import ApplicationStatus from './ApplicationStatus';

describe('ApplicationStatus', () => {
  const handleToggle = jest.fn();
  const handleBack = jest.fn();

  const renderApplicationStatus = () => render((
    <ApplicationStatus
      goBack={handleBack}
      onToggleConfirm={handleToggle}
      applicants={given.applicants}
    />
  ));

  context('모집한 신청자가 존재하지 않은 경우', () => {
    given('applicants', () => []);

    it('"신청한 사람이 없어요" 문구가 보여야만 한다', () => {
      const { container } = renderApplicationStatus();

      expect(container).toHaveTextContent('신청한 사람이 없어요');
    });
  });

  context('모집한 신청자가 존재하지 않은 경우', () => {
    given('applicants', () => [APPLICANT_FIXTURE]);

    it('신청 현황에 대한 내용이 나타나야만 한다', () => {
      const { container } = renderApplicationStatus();

      expect(container).toHaveTextContent(APPLICANT_FIXTURE.introduce);
    });
  });
});
