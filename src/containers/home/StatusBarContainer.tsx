import React, { ReactElement, useCallback, useState } from 'react';
import { useSelector } from 'react-redux';
import { useEffectOnce } from 'react-use';

import styled from '@emotion/styled';

import SwitchButton from '@/components/common/SwitchButton';
import FilterBar from '@/components/home/FilterBar';
import TagsBar from '@/components/home/TagsBar';
import { Category, FilterGroupsCondition } from '@/models/group';
import { loadGroups, loadTagsCount } from '@/reducers/groupSlice';
import { useAppDispatch } from '@/reducers/store';
import Divider from '@/styles/Divider';
import { body1Font } from '@/styles/fontStyles';
import { getGroup } from '@/utils/utils';

type FilterCondition = {
  [K in keyof FilterGroupsCondition]?: FilterGroupsCondition[K];
};

function StatusBarContainer(): ReactElement {
  const defaultCategoryCondition = ['study', 'project'] as Category[];
  const dispatch = useAppDispatch();
  const tagsCount = useSelector(getGroup('tagsCount'));
  const [toggle, setToggle] = useState<boolean>(false);
  const [filterConditionState, setFilterConditionState] = useState<FilterGroupsCondition>({
    category: defaultCategoryCondition,
    isFilterCompleted: false,
  });

  const loadFilteredGroup = useCallback((condition: FilterCondition) => {
    const newCondition = {
      ...filterConditionState,
      ...condition,
    };

    dispatch(loadGroups(newCondition));
    setFilterConditionState(newCondition);
  }, [dispatch, filterConditionState]);

  const onChange = useCallback((category: string) => {
    if (!category) {
      loadFilteredGroup({ category: defaultCategoryCondition });
      return;
    }

    loadFilteredGroup({ category: [category] as Category[] });
  }, [loadFilteredGroup]);

  const onSwitch = useCallback((isFilterCompleted: boolean) => {
    loadFilteredGroup({ isFilterCompleted });
    setToggle(isFilterCompleted);
  }, [loadFilteredGroup]);

  useEffectOnce(() => dispatch(loadTagsCount()));

  return (
    <StatusBarWrapper>
      <FilterBar
        onChange={onChange}
      />
      <StyledDivider />
      <TagsBar
        tags={tagsCount}
      />
      <RecruitmentDeadline>
        <span>모집 마감 안보기</span>
        <SwitchButton
          defaultChecked={toggle}
          onChange={() => onSwitch(!toggle)}
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
