import { act, renderHook, waitFor } from '@testing-library/react';

import { postAddAlarm } from '@/services/api/alarm';
import { postAddApplicant } from '@/services/api/applicants';
import wrapper from '@/test/ReactQueryWrapper';

import ALARM_FIXTURE from '../../../../fixtures/alarm';
import FIXTURE_GROUP from '../../../../fixtures/group';
import FIXTURE_PROFILE from '../../../../fixtures/profile';

import useApplyGroup from './useApplyGroup';

jest.mock('@/services/api/applicants');
jest.mock('@/services/api/alarm');

describe('useApplyGroup', () => {
  const useApplyGroupHook = () => renderHook(() => useApplyGroup(), { wrapper });
  const response = {
    uid: 'uid',
    numberApplicants: 3,
  };

  beforeEach(() => {
    jest.clearAllMocks();

    (postAddAlarm as jest.Mock).mockImplementation(() => (ALARM_FIXTURE));
    (postAddApplicant as jest.Mock).mockImplementation(() => (response));
  });

  it('applicant의 uid와 numberApplicants를 반환해야만 한다', async () => {
    const { result } = useApplyGroupHook();

    await act(async () => {
      await result.current.mutate({
        portfolioUrl: null,
        introduce: 'introduce',
        group: FIXTURE_GROUP,
        applicant: FIXTURE_PROFILE,
      });
    });

    await waitFor(() => expect(result.current.isSuccess).toBeTruthy());
    expect(result.current.data).toEqual([
      response,
      ALARM_FIXTURE,
    ]);
  });
});
