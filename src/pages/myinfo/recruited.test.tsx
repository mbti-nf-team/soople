import { useDispatch, useSelector } from 'react-redux';

import { render } from '@testing-library/react';

import FIXTURE_GROUP from '../../../fixtures/group';

import RecruitedPage from './recruited.page';

describe('RecruitedPage', () => {
  beforeEach(() => {
    (useDispatch as jest.Mock).mockImplementation(() => jest.fn());
    (useSelector as jest.Mock).mockImplementation((selector) => selector({
      authReducer: {
        user: null,
      },
      myInfoReducer: {
        recruitedGroups: [FIXTURE_GROUP],
      },
    }));
  });

  const renderRecruitedPage = () => render((
    <RecruitedPage />
  ));

  it('모집한 팀 페이지에 대한 내용이 보여야만 한다', () => {
    const { container } = renderRecruitedPage();

    expect(container).toHaveTextContent(FIXTURE_GROUP.title);
  });
});
