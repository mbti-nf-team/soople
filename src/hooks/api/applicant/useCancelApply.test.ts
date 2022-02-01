import { act, renderHook } from '@testing-library/react-hooks';

import { deleteApplicant } from '@/services/api/applicants';
import wrapper from '@/test/ReactQueryWrapper';

import FIXTURE_APPLICANT from '../../../../fixtures/applicant';

import useCancelApply, { filteredRemoveApplicant } from './useCancelApply';

jest.mock('@/services/api/applicants');
jest.mock('next/router', () => ({
  useRouter: jest.fn().mockImplementation(() => ({
    query: {
      id: '1',
    },
  })),
}));

describe('useCancelApply', () => {
  const useCancelApplyHook = () => renderHook(() => useCancelApply(), { wrapper });

  beforeEach(() => {
    jest.clearAllMocks();

    (deleteApplicant as jest.Mock).mockImplementation(() => (5));
  });

  it('isSuccess는 true를 반환해야만 한다', async () => {
    const { result } = useCancelApplyHook();

    await act(async () => {
      await result.current.mutate('applicant');
    });

    expect(result.current.isSuccess).toBeTruthy();
    expect(result.current.data).toBe(5);
  });
});

describe('filteredRemoveApplicant', () => {
  const applicants = [FIXTURE_APPLICANT];

  it('applicantId와 다른 applicant만 반환해야만 한다', () => {
    const result = filteredRemoveApplicant('1')(applicants);

    expect(result).toEqual(applicants);
  });
});
