import React, { ReactElement, useCallback, useEffect } from 'react';
import { useSelector } from 'react-redux';

import FilterBar from '@/components/home/FilterBar';
import TagsBar from '@/components/home/TagsBar';
import { Category } from '@/models/group';
import { loadGroups, loadTagsCount } from '@/reducers/groupSlice';
import { useAppDispatch } from '@/reducers/store';
import { getGroup } from '@/utils/utils';

function StatusBarContainer(): ReactElement {
  const dispatch = useAppDispatch();
  const tagsCount = useSelector(getGroup('tagsCount'));

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
    <>
      <FilterBar
        onChange={onChange}
      />
      <TagsBar
        tags={tagsCount}
      />
    </>
  );
}

export default StatusBarContainer;
