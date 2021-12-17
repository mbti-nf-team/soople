import React, { ReactElement, useCallback } from 'react';

import FilterBar from '@/components/home/FilterBar';
import { Category } from '@/models/group';
import { loadGroups } from '@/reducers/groupSlice';
import { useAppDispatch } from '@/reducers/store';

function FilterBarContainer(): ReactElement {
  const dispatch = useAppDispatch();

  const onChange = useCallback((category: string) => {
    if (!category) {
      dispatch(loadGroups(['study', 'project']));
      return;
    }

    dispatch(loadGroups([category as Category]));
  }, [dispatch]);

  return (
    <FilterBar
      onChange={onChange}
    />
  );
}

export default FilterBarContainer;
