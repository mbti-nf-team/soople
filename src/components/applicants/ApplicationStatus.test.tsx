import { render } from '@testing-library/react';

import APPLICANT_FIXTURE from '../../../fixtures/applicant';

import ApplicationStatus from './ApplicationStatus';

describe('ApplicationStatus', () => {
  const handleToggle = jest.fn();

  const renderApplicationStatus = () => render((
    <ApplicationStatus
      onToggleConfirm={handleToggle}
      applicants={[APPLICANT_FIXTURE]}
    />
  ));

  it('신청 현황에 대한 내용이 나타나야만 한다', () => {
    const { container } = renderApplicationStatus();

    expect(container).toHaveTextContent(APPLICANT_FIXTURE.introduce);
  });
});
