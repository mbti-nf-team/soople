import React, { ReactElement, useCallback } from 'react';
import { useLocalStorage } from 'react-use';

import styled from '@emotion/styled';
import dynamic from 'next/dynamic';
import { useRecoilState } from 'recoil';

import FilterBar from '@/components/home/FilterBar';
import TagsBar from '@/components/home/TagsBar';
import useFetchTagsCount from '@/hooks/api/tagsCount/useFetchTagsCount';
import useResponsive from '@/hooks/useResponsive';
import { Category, FilterGroupsCondition } from '@/models/group';
import { groupsConditionState } from '@/recoil/group/atom';
import Divider from '@/styles/Divider';
import { body1Font } from '@/styles/fontStyles';

const SwitchButton = dynamic(
  () => import('@/components/common/SwitchButton'),
  { ssr: false },
);

type FilterCondition = {
  [K in keyof FilterGroupsCondition]?: FilterGroupsCondition[K];
};

function StatusBarContainer(): ReactElement {
  const { isMobile } = useResponsive();

  const { data: tagsCount, isLoading } = useFetchTagsCount();
  const [initFilterCompleted, toggleFilterCompleted] = useLocalStorage('isFilterCompleted', false);
  const [{ isFilterCompleted }, setCondition] = useRecoilState(groupsConditionState);

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
          onChange={onChange}
        />
        {!isMobile && (
          <>
            <StyledDivider />
            <TagsBar
              isLoading={isLoading}
              tags={tagsCount}
            />
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
