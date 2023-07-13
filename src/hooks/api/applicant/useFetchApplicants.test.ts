import { renderHook, waitFor } from '@testing-library/react';

import { getApplicants } from '@/services/api/applicants';
import wrapper from '@/test/ReactQueryWrapper';

import FIXTURE_APPLICANT from '../../../../fixtures/applicant';

import useFetchApplicants from './useFetchApplicants';

jest.mock('@/services/api/applicants');
jest.mock('next/router', () => ({
  useRouter: jest.fn().mockImplementation(() => ({
    query: {
      id: 'groupId',
    },
  })),
}));

describe('useFetchApplicants', () => {
  beforeEach(() => {
    jest.clearAllMocks();

    (getApplicants as jest.Mock).mockImplementation(() => (given.applicants));
  });

  const useFetchApplicantsHook = () => renderHook(() => useFetchApplicants({
    suspense: false,
  }), { wrapper });

  given('applicants', () => [FIXTURE_APPLICANT]);

  it('applicants에 대한 정보를 반환해야만 한다', async () => {
    const { result } = useFetchApplicantsHook();

    await waitFor(() => expect(result.current.isSuccess).toBeTruthy());

    expect(result.current.data).toEqual([FIXTURE_APPLICANT]);
  });
});
