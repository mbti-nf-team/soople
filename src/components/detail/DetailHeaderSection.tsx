import React, { ReactElement } from 'react';

import { Profile } from '@/models/auth';
import { Group } from '@/models/group';

interface Props {
  group: Group;
  writer: Profile;
}

function DetailHeaderSection({ group, writer }: Props): ReactElement {
  const { title } = group;
  const { image, name, email } = writer;

  return (
    <div>
      <h1>{title}</h1>
      <div>
        {image ? (
          <img src={image} alt="writer-img" width="50px" height="50px" />
        ) : (
          <div>이미지 없음</div>
        )}
        <span>
          {name || email}
        </span>
      </div>
    </div>
  );
}

export default DetailHeaderSection;
