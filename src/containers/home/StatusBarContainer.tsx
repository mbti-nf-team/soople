import { ReactElement, Suspense, useCallback } from 'react';

import dynamic from 'next/dynamic';

import styled from '@emotion/styled';
import { useRecoilState } from 'recoil';

import ClientOnly from '@/components/common/ClientOnly';
import ErrorBoundary from '@/components/common/errorBoundary/ErrorBoundary';
import SwitchButton from '@/components/common/SwitchButton';
import FilterBar from '@/components/home/FilterBar';
import TagsBarSkeletonLoader from '@/components/home/skeleton/TagsBarSkeletonLoader';
import useResponsive from '@/hooks/useResponsive';
import { Category, FilterGroupsCondition } from '@/models/group';
import { groupsConditionState } from '@/recoil/group/atom';
import Divider from '@/styles/Divider';
import { body1Font } from '@/styles/fontStyles';

const TagsBar = dynamic(() => import('@/components/home/TagsBar'), { ssr: false });

function StatusBarContainer(): ReactElement {
  const { isMobile, isClient } = useResponsive();

  const [{
    isFilterCompleted, category: filterCategory,
  }, setCondition] = useRecoilState(groupsConditionState);

  const setGroupsCondition = useCallback((
    condition: Partial<FilterGroupsCondition>,
  ) => setCondition((prevCondition) => ({
    ...prevCondition,
    ...condition,
  })), []);

  const onChange = useCallback((category: string) => {
    if (category === 'all') {
      setGroupsCondition({ category: ['study', 'project'] });
      return;
    }

    setGroupsCondition({ category: [category] as Category[] });
  }, [setGroupsCondition]);

  const onToggle = (isCompleted: boolean) => setGroupsCondition({ isFilterCompleted: isCompleted });

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
            <ErrorBoundary size="small">
              <Suspense fallback={<TagsBarSkeletonLoader />}>
                <TagsBar />
              </Suspense>
            </ErrorBoundary>
          </>
        )}
      </div>
      <RecruitmentDeadline>
        <span>모집 마감 안보기</span>
        <ClientOnly>
          <SwitchButton
            defaultChecked={isFilterCompleted}
            onChange={() => onToggle(!isFilterCompleted)}
          />
        </ClientOnly>
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
