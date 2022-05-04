import { renderHook } from '@testing-library/react-hooks';

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

  const useFetchApplicantsHook = () => renderHook(() => useFetchApplicants(), { wrapper });

  context('useQuery반환값이 존재하지 않는 경우', () => {
    given('applicants', () => null);

    it('빈 배열을 반환해야만 한다', async () => {
      const { result, waitFor } = useFetchApplicantsHook();

      await waitFor(() => result.current.isSuccess);

      expect(result.current.data).toEqual([]);
    });
  });

  context('useQuery반환값이 존재하는 경우', () => {
    given('applicants', () => [FIXTURE_APPLICANT]);

    it('applicants에 대한 정보를 반환해야만 한다', async () => {
      const { result, waitFor } = useFetchApplicantsHook();

      await waitFor(() => result.current.isSuccess);

      expect(result.current.data).toEqual([FIXTURE_APPLICANT]);
    });
  });
});
