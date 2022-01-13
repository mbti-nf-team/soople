import { renderHook } from '@testing-library/react-hooks';

import { tomorrow, yesterday } from '@/utils/utils';

import GROUP_FIXTURE from '../../fixtures/group';

import useRecruitDateStatus from './useRecruitDateStatus';

describe('useRecruitDateStatus', () => {
  const useRecruitDateStatusHook = () => renderHook(() => useRecruitDateStatus(
    given.group,
    Date.now(),
  ));

  context('모집 종료를 수동이거나 모집 완료된 경우', () => {
    given('group', () => GROUP_FIXTURE);

    it('글을 작성한 날짜가 반환되어야만 한다', () => {
      const { result: { current } } = useRecruitDateStatusHook();

      expect(current).toBe('2021년 10월 11일');
    });
  });

  context('모집 마감을 자동으로 설정한 경우', () => {
    context('현재 시간이 모집 종료 시간 이전인 경우', () => {
      given('group', () => ({
        ...GROUP_FIXTURE,
        recruitmentEndSetting: 'automatic',
        recruitmentEndDate: tomorrow(new Date()),
      }));

      it('"~ 후 마감"이 나타나야만 한다', () => {
        const { result: { current } } = useRecruitDateStatusHook();

        expect(current).toBe('하루 후 마감');
      });
    });

    context('현재 시간이 모집 종료 시간 이후인 경우', () => {
      given('group', () => ({
        ...GROUP_FIXTURE,
        recruitmentEndSetting: 'automatic',
        recruitmentEndDate: yesterday(new Date()),
      }));

      it('글을 작성한 날짜가 반환되어야만 한다', () => {
        const { result: { current } } = useRecruitDateStatusHook();

        expect(current).toBe('2021년 10월 11일');
      });
    });
  });
});
