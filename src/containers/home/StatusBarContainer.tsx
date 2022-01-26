import React, {
  ReactElement, useCallback, useEffect, useState,
} from 'react';
import { useSelector } from 'react-redux';

import styled from '@emotion/styled';

import SwitchButton from '@/components/common/SwitchButton';
import FilterBar from '@/components/home/FilterBar';
import TagsBar from '@/components/home/TagsBar';
import { Category } from '@/models/group';
import { loadGroups, loadTagsCount } from '@/reducers/groupSlice';
import { useAppDispatch } from '@/reducers/store';
import Divider from '@/styles/Divider';
import { body1Font } from '@/styles/fontStyles';
import { getGroup } from '@/utils/utils';

function StatusBarContainer(): ReactElement {
  const dispatch = useAppDispatch();
  const tagsCount = useSelector(getGroup('tagsCount'));
  const [toggle, setToggle] = useState<boolean>(false);

  const onChange = useCallback((category: string) => {
    if (!category) {
      dispatch(loadGroups(['study', 'project']));
      return;
    }

    dispatch(loadGroups([category as Category]));
  }, [dispatch]);

  useEffect(() => {
    dispatch(loadTagsCount());
  }, []);

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
          onChange={() => setToggle(!toggle)}
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
