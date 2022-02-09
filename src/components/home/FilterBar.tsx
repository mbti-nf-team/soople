import React, { ReactElement } from 'react';

import { SelectOption } from '@/models';

import SelectBox from '../common/SelectBox';

interface Props {
  onChange: (category: string) => void;
}

type Filter = 'study' | 'project' | 'all';

const filterOption: SelectOption<Filter>[] = [
  { label: '전체', value: 'all' },
  { label: '스터디', value: 'study' },
  { label: '프로젝트', value: 'project' },
];

function FilterBar({ onChange }: Props): ReactElement {
  return (
    <div>
      <SelectBox
        id="filter-post"
        defaultValue={filterOption[0]}
        onChange={onChange}
        options={filterOption}
        size="medium"
      />
    </div>
  );
}

export default FilterBar;
