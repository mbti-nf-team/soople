import React, { ReactElement, Suspense, useCallback } from 'react';
import { useLocalStorage } from 'react-use';

import dynamic from 'next/dynamic';

import styled from '@emotion/styled';
import { useRecoilState } from 'recoil';

import FilterBar from '@/components/home/FilterBar';
import TagsBarSkeletonLoader from '@/components/home/skeleton/TagsBarSkeletonLoader';
import useResponsive from '@/hooks/useResponsive';
import { Category, FilterGroupsCondition } from '@/models/group';
import { groupsConditionState } from '@/recoil/group/atom';
import Divider from '@/styles/Divider';
import { body1Font } from '@/styles/fontStyles';

const TagsBar = dynamic(() => import('@/components/home/TagsBar'), { ssr: false });
const SwitchButton = dynamic(() => import('@/components/common/SwitchButton'), { ssr: false });

type FilterCondition = {
  [K in keyof FilterGroupsCondition]?: FilterGroupsCondition[K];
};

function StatusBarContainer(): ReactElement {
  const { isMobile, isClient } = useResponsive();

  const [initFilterCompleted, toggleFilterCompleted] = useLocalStorage('isFilterCompleted', false);
  const [{
    isFilterCompleted, category: filterCategory,
  }, setCondition] = useRecoilState(groupsConditionState);

  const setGroupsCondition = (condition: FilterCondition) => setCondition((prevCondition) => ({
    ...prevCondition,
    ...condition,
  }));

  const onChange = useCallback((category: string) => {
    if (category === 'all') {
      setGroupsCondition({ category: ['study', 'project'] });
      return;
    }

    setGroupsCondition({ category: [category] as Category[] });
  }, [setGroupsCondition]);

  const onToggle = (isWithCompleted: boolean) => {
    setGroupsCondition({ isFilterCompleted: isWithCompleted });
    toggleFilterCompleted(isWithCompleted);
  };

  return (
    <StatusBarWrapper>
      <div>
        <FilterBar
          filterCategory={filterCategory}
          onChange={onChange}
        />
        {(isClient && !isMobile) && (
          <>
            <StyledDivider />
            <Suspense fallback={<TagsBarSkeletonLoader />}>
              <TagsBar />
            </Suspense>
          </>
        )}
      </div>
      <RecruitmentDeadline>
        <span>모집 마감 안보기</span>
        <SwitchButton
          defaultChecked={!!initFilterCompleted}
          onChange={() => onToggle(!isFilterCompleted)}
        />
      </RecruitmentDeadline>
    </StatusBarWrapper>
  );
}

export default StatusBarContainer;

const StatusBarWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  margin-top: 9px;

  & > div:first-of-type {
    display: flex;
    flex-direction: row;
    align-items: center;
  }
`;

const RecruitmentDeadline = styled.div`
  min-width: 171px;
  display: flex;
  flex-direction: row;
  align-items: center;

  & > span {
    ${body1Font()}
    margin: 0 12px;
  }
`;

const StyledDivider = styled(Divider)`
  margin: 0px 16px;
  height: 24px;
`;
