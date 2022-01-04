import { render } from '@testing-library/react';

import ApplyStatusButtonGroup from './ApplyStatusButtonGroup';

describe('ApplyStatusButtonGroup', () => {
  const renderApplyStatusButtonGroup = () => render((
    <ApplyStatusButtonGroup isWriter={given.isWriter} />
  ));

  context('작성자인 경우', () => {
    given('isWriter', () => true);

    it('"신청현황 보기" 버튼이 나타나야만 한다', () => {
      const { container } = renderApplyStatusButtonGroup();

      expect(container).toHaveTextContent('신청현황 보기');
    });
  });

  context('작성자가 아닌 경우', () => {
    given('isWriter', () => false);

    it('"신청하기" 버튼이 나타나야만 한다', () => {
      const { container } = renderApplyStatusButtonGroup();

      expect(container).toHaveTextContent('신청하기');
    });
  });
});
