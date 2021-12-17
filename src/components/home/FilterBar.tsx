import React, { ChangeEvent, ReactElement } from 'react';

import Select from '../common/Select';

interface Props {
  onChange: (category: string) => void;
}

function FilterBar({ onChange }: Props): ReactElement {
  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    onChange(e.target.value);
  };

  return (
    <div>
      <Select
        id="filter-post"
        isDirect={false}
        defaultOption="전체"
        onChange={handleChange}
        options={{
          study: '스터디',
          project: '프로젝트',
        }}
      />
    </div>
  );
}

export default FilterBar;
