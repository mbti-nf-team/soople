import { render } from '@testing-library/react';

import APPLICANT_FIXTURE from '../../../fixtures/applicant';

import ApplicantItem from './ApplicantItem';

describe('ApplicantItem', () => {
  const renderApplicantItem = () => render((
    <ApplicantItem applicationForm={{
      ...APPLICANT_FIXTURE,
      isConfirm: given.isConfirm,
    }}
    />
  ));

  context('"isConfirm"이 true인 경우', () => {
    given('isConfirm', () => true);

    it('"해제" 버튼이 나타나야만 한다', () => {
      const { container } = renderApplicantItem();

      expect(container).toHaveTextContent('해제');
    });
  });

  context('"isConfirm"이 false인 경우', () => {
    given('isConfirm', () => false);

    it('"선택" 버튼이 나타나야만 한다', () => {
      const { container } = renderApplicantItem();

      expect(container).toHaveTextContent('선택');
    });
  });
});
