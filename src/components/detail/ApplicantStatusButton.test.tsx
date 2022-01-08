import { render } from '@testing-library/react';

import ApplicantStatusButton from './ApplicantStatusButton';

describe('ApplicantStatusButton', () => {
  const renderApplicantStatusButton = (isCompleted: boolean) => render((
    <ApplicantStatusButton
      isCompleted={isCompleted}
    />
  ));

  context('isCompleted가 true인 경우', () => {
    it('"팀원 보기"버튼이 보여야만 한다', () => {
      const { container } = renderApplicantStatusButton(true);

      expect(container).toHaveTextContent('팀원 보기');
    });
  });

  context('isCompleted가 false인 경우', () => {
    it('"신청하기"버튼이 보여야만 한다', () => {
      const { container } = renderApplicantStatusButton(false);

      expect(container).toHaveTextContent('신청하기');
    });
  });
});
