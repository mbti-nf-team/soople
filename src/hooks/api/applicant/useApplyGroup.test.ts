import { act, renderHook } from '@testing-library/react-hooks';

import { postAddApplicant } from '@/services/api/applicants';
import wrapper from '@/test/ReactQueryWrapper';

import FIXTURE_PROFILE from '../../../../fixtures/profile';

import useApplyGroup from './useApplyGroup';

jest.mock('@/services/api/applicants');

describe('useApplyGroup', () => {
  const useApplyGroupHook = () => renderHook(() => useApplyGroup(), { wrapper });
  const response = {
    uid: 'uid',
    numberApplicants: 3,
  };

  beforeEach(() => {
    jest.clearAllMocks();

    (postAddApplicant as jest.Mock).mockImplementation(() => (response));
  });

  it('applicant의 uid와 numberApplicants를 반환해야만 한다', async () => {
    const { result } = useApplyGroupHook();

    await act(async () => {
      await result.current.mutate({
        portfolioUrl: null,
        introduce: 'introduce',
        groupId: '1',
        applicant: FIXTURE_PROFILE,
      });
    });

    expect(result.current.data).toEqual(response);
  });
});
