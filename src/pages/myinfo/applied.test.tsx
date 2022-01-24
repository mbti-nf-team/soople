import { render } from '@testing-library/react';

import AppliedPage from './applied.page';

describe('AppliedPage', () => {
  const renderAppliedPage = () => render((
    <AppliedPage />
  ));

  it('신청한 팀 페이지에 대한 내용이 보여야만 한다', () => {
    const { container } = renderAppliedPage();

    expect(container).toHaveTextContent('신청한 팀');
  });
});
