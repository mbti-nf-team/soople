import React, { ReactElement, useCallback } from 'react';

import styled from '@emotion/styled';
import { useRecoilState } from 'recoil';

import SwitchButton from '@/components/common/SwitchButton';
import FilterBar from '@/components/home/FilterBar';
import TagsBar from '@/components/home/TagsBar';
import useFetchTagsCount from '@/hooks/api/tagsCount/useFetchTagsCount';
import { Category, FilterGroupsCondition } from '@/models/group';
import { groupsConditionState } from '@/recoil/group/atom';
import Divider from '@/styles/Divider';
import { body1Font } from '@/styles/fontStyles';

type FilterCondition = {
  [K in keyof FilterGroupsCondition]?: FilterGroupsCondition[K];
};

function StatusBarContainer(): ReactElement {
  const { data: tagsCount, isLoading } = useFetchTagsCount();
  const [{ isFilterCompleted }, setCondition] = useRecoilState(groupsConditionState);

  const setGroupsCondition = (condition: FilterCondition) => setCondition((prevCondition) => ({
    ...prevCondition,
    ...condition,
  }));

  const onChange = useCallback((category: string) => {
    if (!category) {
      setGroupsCondition({ category: ['study', 'project'] });
      return;
    }

    setGroupsCondition({ category: [category] as Category[] });
  }, [setGroupsCondition]);

  return (
    <StatusBarWrapper>
      <div>
        <FilterBar
          onChange={onChange}
        />
        <StyledDivider />
        <TagsBar
          isLoading={isLoading}
          tags={tagsCount}
        />
      </div>
      <RecruitmentDeadline>
        <span>모집 마감 안보기</span>
        <SwitchButton
          defaultChecked={isFilterCompleted}
          onChange={() => setGroupsCondition({ isFilterCompleted: !isFilterCompleted })}
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
  display: flex;
  flex-direction: row;
  align-items: center;

  & > span {
    ${body1Font()}
    margin-right: 12px;
  }
`;

const StyledDivider = styled(Divider)`
  margin: 0px 16px;
  height: 24px;
`;
