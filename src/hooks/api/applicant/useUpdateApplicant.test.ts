import { act, renderHook } from '@testing-library/react-hooks';

import { putApplicant } from '@/services/api/applicants';
import wrapper from '@/test/ReactQueryWrapper';

import FIXTURE_APPLICANT from '../../../../fixtures/applicant';

import useUpdateApplicant, { updateApplicant } from './useUpdateApplicant';

jest.mock('@/services/api/applicants');

describe('useUpdateApplicant', () => {
  const useUpdateApplicantHook = () => renderHook(() => useUpdateApplicant(), { wrapper });

  it('"putApplicant"호출되어야만 한다', async () => {
    const { result } = useUpdateApplicantHook();

    await act(async () => {
      await result.current.mutate(FIXTURE_APPLICANT);
    });

    expect(result.current.isSuccess).toBeTruthy();
    expect(putApplicant).toBeCalledWith(FIXTURE_APPLICANT);
  });
});

describe('updateApplicant', () => {
  const applicants = [FIXTURE_APPLICANT];

  context('applicant.uid가 같은 경우', () => {
    it('applicant가 변경되어야만 한다', () => {
      const result = updateApplicant({
        ...FIXTURE_APPLICANT,
        isConfirm: true,
      })(applicants);

      expect(result).toEqual([{
        ...FIXTURE_APPLICANT,
        isConfirm: true,
      }]);
    });
  });

  context('applicant.uid가 다른 경우', () => {
    it('applicant가 변경되지 않은 채로 반환해야만 한다', () => {
      const result = updateApplicant({
        ...FIXTURE_APPLICANT,
        uid: '1',
        isConfirm: true,
      })(applicants);

      expect(result).toEqual(applicants);
    });
  });
});
