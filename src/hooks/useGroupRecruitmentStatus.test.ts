import { renderHook } from '@testing-library/react-hooks';

import { tomorrow, yesterday } from '@/utils/utils';

import GROUP_FIXTURE from '../../fixtures/group';

import useGroupRecruitmentStatus from './useGroupRecruitmentStatus';

describe('useGroupRecruitmentStatus', () => {
  const useGroupRecruitmentStatusHook = () => renderHook(() => useGroupRecruitmentStatus(
    given.group,
  ));

  context('group이 존재하지 않는 경우', () => {
    given('group', () => (undefined));

    it('null을 반환되어야만 한다', () => {
      const { result: { current } } = useGroupRecruitmentStatusHook();

      expect(current).toBeNull();
    });
  });

  context('모집 완료 상태이고 manual(수동) 상태일 경우', () => {
    given('group', () => ({
      ...GROUP_FIXTURE,
      isCompleted: true,
      recruitmentEndSetting: 'manual',
    }));

    it('"manualCompletedRecruitment" 상태가 반환되어야만 한다', () => {
      const { result: { current } } = useGroupRecruitmentStatusHook();

      expect(current).toBe('manualCompletedRecruitment');
    });
  });

  context('모집 완료 상태이고 automatic(자동) 상태이며, 현재 시간이 마감 시간보다 이전인 경우', () => {
    given('group', () => ({
      ...GROUP_FIXTURE,
      isCompleted: true,
      recruitmentEndSetting: 'automatic',
      recruitmentEndDate: tomorrow(new Date()),
    }));

    it('"automaticBeforeCompletedRecruitment" 상태가 반환되어야만 한다', () => {
      const { result: { current } } = useGroupRecruitmentStatusHook();

      expect(current).toBe('automaticBeforeCompletedRecruitment');
    });
  });

  context('모집 완료 상태이고 automatic(자동) 상태이며, 현재 시간이 마감 시간보다 이후인 경우', () => {
    given('group', () => ({
      ...GROUP_FIXTURE,
      isCompleted: true,
      recruitmentEndSetting: 'automatic',
      recruitmentEndDate: yesterday(new Date()),
    }));

    it('"automaticAfterCompletedRecruitment" 상태가 반환되어야만 한다', () => {
      const { result: { current } } = useGroupRecruitmentStatusHook();

      expect(current).toBe('automaticAfterCompletedRecruitment');
    });
  });

  context('모집 완료 상태가 아니고, manual(수동) 상태인 경우', () => {
    given('group', () => ({
      ...GROUP_FIXTURE,
      isCompleted: false,
      recruitmentEndSetting: 'manual',
      recruitmentEndDate: '',
    }));

    it('"manualRecruiting" 상태가 반환되어야만 한다', () => {
      const { result: { current } } = useGroupRecruitmentStatusHook();

      expect(current).toBe('manualRecruiting');
    });
  });

  context('모집 완료 상태가 아니고, automatic(자동) 상태이며, 현재 시간이 마감 시간보다 이전인 경우', () => {
    given('group', () => ({
      ...GROUP_FIXTURE,
      isCompleted: false,
      recruitmentEndSetting: 'automatic',
      recruitmentEndDate: tomorrow(new Date()),
    }));

    it('"automaticRecruiting" 상태가 반환되어야만 한다', () => {
      const { result: { current } } = useGroupRecruitmentStatusHook();

      expect(current).toBe('automaticRecruiting');
    });
  });

  context('모집 완료 상태가 아니고, automatic(자동) 상태이며, 현재 시간이 마감 시간보다 이후인 경우', () => {
    given('group', () => ({
      ...GROUP_FIXTURE,
      isCompleted: false,
      recruitmentEndSetting: 'automatic',
      recruitmentEndDate: yesterday(new Date()),
    }));

    it('"automaticCloseRecruitment" 상태가 반환되어야만 한다', () => {
      const { result: { current } } = useGroupRecruitmentStatusHook();

      expect(current).toBe('automaticCloseRecruitment');
    });
  });
});
