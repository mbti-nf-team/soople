import { render } from '@testing-library/react';

import RecruitedPage from './recruited.page';

describe('RecruitedPage', () => {
  const renderRecruitedPage = () => render((
    <RecruitedPage />
  ));

  it('모집한 팀 페이지에 대한 내용이 보여야만 한다', () => {
    const { container } = renderRecruitedPage();

    expect(container).toHaveTextContent('모집한 팀');
  });
});
