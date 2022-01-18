import { useDispatch, useSelector } from 'react-redux';

import { render } from '@testing-library/react';

import APPLICANT_FIXTURE from '../../../fixtures/applicant';

import ApplicationStatusContainer from './ApplicationStatusContainer';

describe('ApplicationStatusContainer', () => {
  const dispatch = jest.fn();

  beforeEach(() => {
    dispatch.mockClear();

    (useDispatch as jest.Mock).mockImplementation(() => dispatch);
    (useSelector as jest.Mock).mockImplementation((selector) => selector({
      groupReducer: {
        applicants: [APPLICANT_FIXTURE],
        groupId: '1',
      },
    }));
  });

  const renderApplicationStatusContainer = () => render((
    <ApplicationStatusContainer />
  ));

  it('첫 랜더링시에 dispatch 액션이 호출되어야만 한다', () => {
    renderApplicationStatusContainer();

    expect(dispatch).toBeCalledTimes(1);
  });
});
