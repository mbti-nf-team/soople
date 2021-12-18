import React, { ReactElement } from 'react';

import dayjs from 'dayjs';

import useRecruitDateStatus from '@/hooks/useRecruitDateStatus';
import { Group } from '@/models/group';

import 'dayjs/locale/ko';

dayjs.locale('ko');

interface Props {
  group: Group;
  currentTime: number;
}

function DetailHeaderSection({ group, currentTime }: Props): ReactElement {
  const { writer } = group;

  const recruitDate = useRecruitDateStatus(group, currentTime);

  return (
    <div>
      <h1>{group.title}</h1>
      <div>
        {writer.image ? (
          <img src={writer.image} alt="writer-img" width="50px" height="50px" />
        ) : (
          <div>이미지 없음</div>
        )}
        <span>
          {writer.name || writer.email}
        </span>
        <div>
          {recruitDate}
        </div>
      </div>
    </div>
  );
}

export default DetailHeaderSection;
