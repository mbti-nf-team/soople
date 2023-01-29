import { ReactElement } from 'react';

import { SelectOption } from '@/models';
import { Category } from '@/models/group';

import SelectBox from '../common/SelectBox';

interface Props {
  onChange: (category: string) => void;
  filterCategory: Category[];
}

type Filter = 'study' | 'project' | 'all';

const filterOption: SelectOption<Filter>[] = [
  { label: '전체', value: 'all' },
  { label: '스터디', value: 'study' },
  { label: '프로젝트', value: 'project' },
];

function FilterBar({ onChange, filterCategory }: Props): ReactElement {
  const categoryValue: { [K in string]: SelectOption<Filter> } = {
    'project,study': filterOption[0],
    'study,project': filterOption[0],
    study: filterOption[1],
    project: filterOption[2],
  };

  return (
    <div>
      <SelectBox
        id="filter-post"
        defaultValue={filterOption[0]}
        value={categoryValue[filterCategory.join()]}
        onChange={onChange}
        options={filterOption}
        size="medium"
      />
    </div>
  );
}

export default FilterBar;
