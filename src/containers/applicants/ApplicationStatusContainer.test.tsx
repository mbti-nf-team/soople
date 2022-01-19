import { useDispatch, useSelector } from 'react-redux';

import { fireEvent, render, screen } from '@testing-library/react';

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

  describe('"선택" 버튼을 클릭한다', () => {
    it('dispatch 액션이 호출되어야만 한다', () => {
      renderApplicationStatusContainer();

      fireEvent.click(screen.getByText('선택'));

      expect(dispatch).toBeCalledTimes(2);
    });
  });
});
