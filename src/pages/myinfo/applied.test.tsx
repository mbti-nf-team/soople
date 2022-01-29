import { useDispatch, useSelector } from 'react-redux';

import { render } from '@testing-library/react';

import FIXTURE_GROUP from '../../../fixtures/group';

import AppliedPage from './applied.page';

describe('AppliedPage', () => {
  beforeEach(() => {
    (useDispatch as jest.Mock).mockImplementation(() => jest.fn());
    (useSelector as jest.Mock).mockImplementation((selector) => selector({
      authReducer: {
        user: null,
      },
      myInfoReducer: {
        appliedGroups: [FIXTURE_GROUP],
      },
    }));
  });

  const renderAppliedPage = () => render((
    <AppliedPage />
  ));

  it('신청한 팀 페이지에 대한 내용이 보여야만 한다', () => {
    const { container } = renderAppliedPage();

    expect(container).toHaveTextContent(FIXTURE_GROUP.title);
  });
});
